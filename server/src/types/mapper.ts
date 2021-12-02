import { classes } from '@automapper/classes';
import { createMapper, mapFrom } from '@automapper/core';
import { Game, GameSummary } from './game';
import { Quiz, QuizSummary } from './quiz';

export const mapper = createMapper({
  name: 'mapper',
  pluginInitializer: classes
});

mapper.createMap(Quiz, QuizSummary).forMember(
  destination => destination.questionCount,
  mapFrom(source => source.questions.length)
);

mapper.createMap(Game, GameSummary);
