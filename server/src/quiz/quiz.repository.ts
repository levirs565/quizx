import { Types, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { QuizModelName } from 'schemas/quiz.schema';
import { BaseModel } from 'schemas/helper';
import { Quiz, QuizSummary } from '@quizx/shared';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class QuizRepository {
  constructor(
    @InjectModel(QuizModelName) private readonly model: BaseModel<Quiz>,
    @InjectMapper() private readonly mapper: Mapper
  ) {}

  async getSummaryList(): Promise<QuizSummary[]> {
    const list = await this.model.find();

    return list.map((val) => this.mapper.map(val.toClass(), Quiz, QuizSummary));
  }

  async getById(id: string): Promise<Quiz> {
    const quizPackage = await this.model.findById(id);

    if (!quizPackage) throw new NotFoundException('Quiz not found');

    return quizPackage.toClass();
  }

  async createOne(quiz: Quiz) {
    const db = new this.model(instanceToPlain(quiz));
    await db.save();
    quiz.id = db.id;
  }

  async updateById(quiz: Quiz) {
    const { title, tags, questions } = instanceToPlain(quiz);
    await this.model.updateOne(
      { _id: quiz.id },
      {
        $set: {
          title,
          tags,
          questions,
        },
      }
    );
  }

  async deleteById(id: string) {
    await this.model.deleteOne({ _id: id });
  }

  generateQuestionId() {
    return new Types.ObjectId().toHexString();
  }
}
