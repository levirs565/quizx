import { ToObjectOptions, Model, Schema } from 'mongoose';

interface BaseModelMethods<T> {
  toPlain(): T
}

export type BaseModel<T> = Model<T, {}, BaseModelMethods<T>>

export type BaseModelSchema<T> = Schema<T, BaseModel<T>, undefined, BaseModelMethods<T>>

export function configureBaseModelSchema<T>(schema: BaseModelSchema<T>) {
  schema.methods.toPlain = function () {
    return this.toObject(toObjectOptions)
  }
}

const toObjectOptions: ToObjectOptions = {
  virtuals: ['id'],
  transform: (doc, ret, options) => {
    delete ret['_id'];
    return ret;
  },
  versionKey: false
};
