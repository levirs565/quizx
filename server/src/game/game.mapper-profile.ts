import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Game, GameSummary } from '@quizx/shared';

@Injectable()
export class GameMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() readonly mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, Game, GameSummary);
    };
  }
}
