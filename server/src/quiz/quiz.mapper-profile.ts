import { createMap, forMember, mapFrom, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Quiz, QuizSummary } from '@quizx/shared';

@Injectable()
export class QuizMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() readonly mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        Quiz,
        QuizSummary,
        forMember(
          (destination) => destination.questionCount,
          mapFrom((source) => source.questions.length)
        )
      );
    };
  }
}
