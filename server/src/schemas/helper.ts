import { plainToClass } from 'class-transformer';
import { ToObjectOptions, Model, Schema } from 'mongoose';

export interface BaseModelMethods<T> {
  toClass(): T;
}

export type BaseModel<T> = Model<T, {}, BaseModelMethods<T>>;

export type BaseModelSchema<T> = Schema<T, BaseModel<T>, BaseModelMethods<T>>;

export function configureBaseModelSchema<T>(schema: BaseModelSchema<T>, constructor: new () => T) {
  schema.methods.toClass = function () {
    return plainToClass(constructor, this.toObject(toObjectOptions), { ignoreDecorators: true });
  };
  if (!schema.paths['id']) configureSchemaIdSetter(schema);
}

export function configureSchemaIdSetter(schema: Schema<any, any, any>) {
  schema.virtual('id').set(setId);
  return schema;
}

const toObjectOptions: ToObjectOptions = {
  virtuals: ['id'],
  transform: (doc, ret, options) => {
    delete ret['_id'];
    return ret;
  },
  versionKey: false,
};

function setId(this: any, id: any) {
  this._id = id;
}
