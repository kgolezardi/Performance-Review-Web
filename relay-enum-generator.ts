import * as fs from 'fs';
import * as path from 'path';
import {
  ExecutionResult,
  IntrospectionEnumType,
  IntrospectionQuery,
  IntrospectionType,
  buildSchema,
  graphql,
  introspectionQuery,
} from 'graphql';

const relayConfig = require('relay-config').loadConfig();

function findRelayConfigOption(option: string) {
  return relayConfig[option];
}

const schemaPath = findRelayConfigOption('schema');

/**
 *
 * Parses schema file basedd on its extension.
 * .json and .graphql are supported.
 *
 * @param rawSchema schema file read from filesystem
 * @param schemaPath full path of schema file, found in relay.config file
 */
async function parseSchema(rawSchema: string, schemaPath: string) {
  const schemaExtname = path.extname(schemaPath);
  let schema: ExecutionResult<IntrospectionQuery>;

  switch (schemaExtname) {
    case '.graphql':
      const graphqlSchema = buildSchema(rawSchema);
      schema = await graphql(graphqlSchema, introspectionQuery, {});
      break;
    case '.json':
      schema = JSON.parse(rawSchema);
      break;
    default:
      schema = undefined;
      break;
  }
  return schema;
}

const schemaFile = fs.readFileSync(schemaPath, 'utf8');

function isIntrospectionEnumType(type: IntrospectionType): type is IntrospectionEnumType {
  return type.kind === 'ENUM';
}

function schemaJsonToEnums(schema: ExecutionResult<IntrospectionQuery>) {
  return schema.data.__schema.types
    .filter(isIntrospectionEnumType)
    .filter(({ name }) => !name.startsWith('_'))
    .map((e) => {
      const { name, enumValues } = e;
      const values = enumValues.map((enumValue) => enumValue.name).concat('%future added value');

      return `export type ${name} =\n  | '` + values.join("'\n  | '") + "'" + '\n';
    })
    .join('\n\n');
}

function writeFromSchema(schemaJson: any, config: Config) {
  const enums = schemaJsonToEnums(schemaJson);
  if (!fs.existsSync(config.path)) {
    fs.mkdirSync(config.path);
  }
  fs.writeFileSync(path.resolve(config.path, config.name), enums);
}

interface Config {
  name: string;
  path: string;
}

async function main(config: Config) {
  await parseSchema(schemaFile, schemaPath).then((schemaJson) => {
    writeFromSchema(schemaJson, config);
  });
}

const config: Config = { name: 'enums.ts', path: './src/__generated__' };

main(config);
