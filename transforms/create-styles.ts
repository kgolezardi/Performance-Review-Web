import { ASTPath, Collection, ImportDeclaration, Transform, VariableDeclaration } from 'jscodeshift';

/**
 * This transform **does not** work with styles that are an arrow function with `BlockStatement` body.
 * This **does not** work with files that have multiple makeStyles or styles functions,
 * or styles function that are defined in other scopes rather than the file scope.
 *
 * Transforms:
 *```
 * import { makeStyles } from '@material-ui/core`
 * import { CreateCSSProperties, CSSProperties } from '@material-ui/core/styles/withStyles';
 *
 * const styles = (theme) => ({
 * root: ({ customColor }: OwnProps) =>
 *  ({
 *     color: customColor,
 *   } as CreateCSSProperties),
 *  open: {} as CSSProperties
 * });
 *```
 *
 * To:
 *```
 * import { makeStyles, createStyles } from '@material-ui/core`
 *
 * const styles = (theme) => createStyles({
 * root: ({ customColor }: OwnProps) =>
 *  ({
 *     color: customColor,
 *   }),
 *  open: {}
 * });
 *```
 */
const transform: Transform = (file, api, options) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  const isSpecifierOnPath = (path: ASTPath<ImportDeclaration>, name: string) => {
    if (path.node.specifiers == undefined) {
      return;
    }
    return path.value.specifiers.some(
      (specifier) => specifier.type === 'ImportSpecifier' && specifier.imported.name === name,
    );
  };

  const isSpecifierOnPaths = (importDeclerations: Collection<ImportDeclaration>, name: string) =>
    importDeclerations.filter((path) => isSpecifierOnPath(path, name)).size() > 0;

  // Get all paths that import from @material-ui
  const materialUiImportPaths = root
    .find(j.ImportDeclaration, {
      type: 'ImportDeclaration',
    })
    .filter((path) => {
      return (
        (path.value.source.type === 'Literal' || path.value.source.type === 'StringLiteral') &&
        typeof path.value.source.value === 'string' &&
        path.value.source.value.startsWith('@material-ui')
      );
    });

  const CSSPropertiesImported = isSpecifierOnPaths(materialUiImportPaths, 'CSSProperties');
  const CreateCSSPropertiesImported = isSpecifierOnPaths(materialUiImportPaths, 'CreateCSSProperties');
  const createStylesImported = isSpecifierOnPaths(materialUiImportPaths, 'createStyles');
  const makeStylesImported = isSpecifierOnPaths(materialUiImportPaths, 'makeStyles');

  const continueToTransform = makeStylesImported && (CSSPropertiesImported || CreateCSSPropertiesImported);

  if (!continueToTransform) {
    return root.toSource();
  }

  // Find makeStyles function
  const makeStylesPaths = root.find(j.CallExpression, {
    callee: {
      name: 'makeStyles',
    },
  });

  const makeStylesPath = makeStylesPaths.paths()[0];

  // Find makeStyles first argument name (it is usually named `styles`)
  const stylesVariableName =
    makeStylesPath.value.arguments[0].type === 'Identifier' && makeStylesPath.value.arguments[0].name;

  const findFileScopeVariableDecleration = (variable: string): VariableDeclaration | undefined => {
    return root
      .find(j.Program)
      .get('body')
      .filter((path) => {
        return path.node.type === 'VariableDeclaration' && path.node.declarations[0].id.name === variable;
      });
  };

  const stylesDeclaration = findFileScopeVariableDecleration(stylesVariableName);

  if (!stylesDeclaration) {
    return root.toSource();
  }

  const asExpressionsToRemove = j(stylesDeclaration)
    .find(j.TSAsExpression)
    .filter(
      (path) =>
        path.value.typeAnnotation.type === 'TSTypeReference' &&
        path.value.typeAnnotation.typeName.type === 'Identifier' &&
        (path.value.typeAnnotation.typeName.name === 'CSSProperties' ||
          path.value.typeAnnotation.typeName.name === 'CreateCSSProperties'),
    );

  asExpressionsToRemove.forEach((path) => path.replace(path.value.expression));

  if (!createStylesImported) {
    // Add `createStyles` Import
    materialUiImportPaths
      .filter((path) => {
        return path.value.specifiers.some(
          (specifier) => specifier.type === 'ImportSpecifier' && specifier.imported.name === 'makeStyles',
        );
      })
      .paths()[0]
      .value.specifiers.push(j.importSpecifier(j.identifier('createStyles'), j.identifier('createStyles')));
  }

  const removeImportSpecifier = (path: ASTPath<ImportDeclaration>, name: string) => {
    if (!isSpecifierOnPath(path, name)) {
      return;
    }
    if (path.value.specifiers.length > 1) {
      path.value.specifiers = path.value.specifiers.filter((specifier) => {
        if (specifier.type === 'ImportSpecifier') {
          return specifier.imported.name !== name;
        }
        return true;
      });
    } else {
      path.replace();
    }
  };

  // Remove `CSSProperties` and `CreateCSSProperties` imports
  materialUiImportPaths.forEach((path) => {
    removeImportSpecifier(path, 'CSSProperties');
    removeImportSpecifier(path, 'CreateCSSProperties');
  });

  // Wrap `createStyles` around body of styles function
  j(stylesDeclaration)
    .find(j.ArrowFunctionExpression)
    .filter((path) => path.name === 'init')
    .replaceWith((path) => {
      if (path.node.body.type === 'ObjectExpression') {
        return j.template.expression`( ${path.node.params} ) => createStyles(${path.node.body})`;
      }
      return path.node;
    });

  return root.toSource();
};

export default transform;
