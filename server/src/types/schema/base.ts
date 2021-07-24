export interface JSONSchema<T> {
  type: string;
  required: string[];
  additionalProperties: false;
  properties: any;
}
