import { Schema } from 'mongoose';
import { configureSchemaIdSetter } from './helper';

interface QuestionSchemaContainer {
  readonly root: Schema<any, any, any>;
  readonly discriminators: {
    [name: string]: Schema<any, any, any>;
  };
}

export function createQuestionSchema(answerRequired: boolean): QuestionSchemaContainer {
  return {
    root: configureSchemaIdSetter(
      new Schema(
        {
          question: {
            type: String,
            required: true,
          },
        },
        {
          discriminatorKey: 'type',
        }
      )
    ),
    discriminators: {
      'multiple-choice': new Schema({
        choices: {
          type: Array,
          required: true,
        },
        answer: {
          type: Number,
          required: answerRequired,
        },
      }),
      'short-text': new Schema({
        answer: {
          type: String,
          required: answerRequired,
        },
      }),
      number: new Schema({
        answer: {
          type: Number,
          required: answerRequired,
        },
      }),
      math: new Schema({
        answer: {
          type: String,
          required: answerRequired,
        },
      }),
    },
  };
}

export function configureQuestionDiscriminators(
  schema: Schema<any, any, any>,
  path: string,
  container: QuestionSchemaContainer
) {
  const questionSchema = schema.path<Schema.Types.DocumentArray>(path);
  for (const name in container.discriminators) {
    const schema = container.discriminators[name];
    questionSchema.discriminator(name, schema);
  }
}
