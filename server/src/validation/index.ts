import Ajv from 'ajv';
import schemas from './schema.json';

export const ajv = new Ajv({
  allErrors: true
});

ajv.addSchema(schemas)