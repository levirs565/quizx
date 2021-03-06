import { Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Game, GameSummary } from 'types/game';

@Injectable()
export class GameMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() readonly mapper: Mapper) {
    super(mapper);
  }

  mapProfile(): MappingProfile {
    return (mapper) => {
      mapper.createMap(Game, GameSummary);
    };
  }
}
