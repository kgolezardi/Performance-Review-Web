import * as fs from 'fs';
import * as mkdir from 'mkdirp';
import * as path from 'path';
import {
  ExecutionResult,
  IntrospectionEnumType,
  IntrospectionSchema,
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
// TODO: get this from cli
const writePath = './src/__generated__';
// TODO: get this from cli
const filename = 'enums.ts';

async function parseSchema(rawSchemaContent: string, schemaPath: string) {
  const schemaType = schemaPath.split('.').pop()?.toLowerCase();
  let schema: ExecutionResult<IntrospectionSchema>;

  switch (schemaType) {
    case 'graphql':
      const graphqlSchema = buildSchema(rawSchemaContent);
      schema = await graphql<IntrospectionSchema>(graphqlSchema, introspectionQuery, {});
      break;
    case 'json':
      schema = JSON.parse(rawSchemaContent);
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

function writeFromSchema(schemaJson: ExecutionResult<IntrospectionSchema>) {
  let enums = schemaJson.data.types
    .filter(isIntrospectionEnumType)
    .filter(({ name }) => !name.startsWith('_'))
    .map((e) => {
      const { name, enumValues } = e;
      // get only values, not things like descriptions ...
      const values = enumValues.map((enumValue) => enumValue.name).concat('%future added value');

      return `export type ${name} =\n  | '` + values.join("'\n  | '") + "'" + '\n';
    })
    .join('\n\n');

  mkdir(writePath);
  fs.writeFileSync(path.resolve(writePath, filename), enums);
  // TODO: fromat file
}

parseSchema(schemaFile, schemaPath).then(writeFromSchema);
