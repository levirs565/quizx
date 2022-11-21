<template>
  <Story>
    <Variant title="Multiple Choice" auto-props-disabled source="Disabled">
      <v-layout>
        <v-navigation-drawer permanent>
          <v-textarea label="Question" v-model="multipleChoice.question" />
          <v-textarea
            v-for="(choice, index) in multipleChoice.choices"
            :label="`Choice ${index + 1}`"
            :modelValue="choice"
            @update:modelValue="multipleChoice.choices[index] = $event"
          />
          <v-text-field
            type="number"
            label="Answer"
            v-model.number="multipleChoice.answer"
          />
          <p>
            Answer is undefined:
            {{ multipleChoice.answer == undefined }}
          </p>
        </v-navigation-drawer>
        <v-main class="ma-2">
          <question-view
            :question="multipleChoice"
            :index="1"
            @answer-changed="logEvent('Answer changed', $event)"
          />
        </v-main>
      </v-layout>
    </Variant>

    <Variant title="Short Text" auto-props-disabled source="Disabled">
      <v-layout>
        <v-navigation-drawer permanent>
          <v-textarea label="Question" v-model="shortText.question" />
          <v-text-field label="Answer" v-model="shortText.answer" />
          <p>
            Answer is undefined:
            {{ shortText.answer == undefined }}
          </p>
        </v-navigation-drawer>
        <v-main class="ma-2">
          <question-view
            :question="shortText"
            :index="1"
            @answer-changed="logEvent('Answer changed', $event)"
          />
        </v-main>
      </v-layout>
    </Variant>

    <Variant title="Number" auto-props-disabled source="Disabled">
      <v-layout>
        <v-navigation-drawer permanent>
          <v-textarea label="Question" v-model="number.question" />
          <v-text-field label="Answer" v-model.number="number.answer" />
          <p>
            Answer is undefined:
            {{ number.answer == undefined }}
          </p>
        </v-navigation-drawer>
        <v-main class="ma-2">
          <question-view
            :question="number"
            :index="1"
            @answer-changed="logEvent('Answer changed', $event)"
          />
        </v-main>
      </v-layout>
    </Variant>

    <Variant title="Math" auto-props-disabled source="Disabled">
      <v-layout>
        <v-navigation-drawer permanent>
          <v-textarea label="Question" v-model="math.question" />
          <v-text-field label="Answer" v-model.number="math.answer" />
          <p>
            Answer is undefined:
            {{ math.answer == undefined }}
          </p>
        </v-navigation-drawer>
        <v-main class="ma-2">
          <question-view
            :question="math"
            :index="1"
            @answer-changed="logEvent('Answer changed', $event)"
          />
        </v-main>
      </v-layout>
    </Variant>
  </Story>
</template>
<script setup lang="ts">
import {
  MathQuestion,
  MultipleChoiceQuestion,
  NumberQuestion,
  ShortTextQuestion,
} from "@quizx/shared";
import { reactive } from "vue";
import { logEvent } from "histoire/client";
import QuestionView from "./Question.vue";

const multipleChoice = reactive(new MultipleChoiceQuestion());
const shortText = reactive(new ShortTextQuestion());
const number = reactive(new NumberQuestion());
const math = reactive(new MathQuestion());

[multipleChoice, shortText, number, math].forEach((val) => {
  val.question = "A Question";
  if (val instanceof MultipleChoiceQuestion) {
    val.choices = ["Choice 1", "Choice 2", "Choice 3", "Choice 4"];
  }
});
</script>
