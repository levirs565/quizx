<template>
  <v-card>
    <v-card-title>Play Game</v-card-title>
    <v-card-text>
      <v-switch
        v-model="preference.shuffleQuestions"
        label="Shuffle Questions"
      />
      <v-select
        v-model="mode"
        :items="modeList"
        item-value="type"
        item-title="text"
        label="Mode"
        variant="outlined"
        hide-details
      />
      <template v-if="mode == 'exam'">
        <v-switch label="Limit Exam Time" v-model="exam.timeLimit.enabled" />
        <duration-input
          label="Exam Time Limit"
          v-show="exam.timeLimit.enabled"
          v-model="exam.timeLimit.second"
        />
      </template>
      <template v-if="mode == 'flash-card'">
        <v-switch
          label="Limit Question Time"
          v-model="flashCard.questionTimeLimit.enabled"
        />
        <duration-input
          label="Question Time Limit"
          v-show="flashCard.questionTimeLimit.enabled"
          v-model="flashCard.questionTimeLimit.second"
        />
        <v-switch
          label="Limit Retry Count"
          v-model="flashCard.retryCountLimit.enabled"
        />
        <v-text-field
          label="Retry Count Limit"
          type="number"
          v-show="flashCard.retryCountLimit.enabled"
          v-model.number="flashCard.retryCountLimit.count"
          variant="outlined"
          hide-details
        />
      </template>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn variant="text" @click="$emit('close')">Cancel</v-btn>
      <v-btn color="primary" @click="submit">Play Now</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import DurationInput from "@/components/DurationInput.vue";
export default {
  components: { DurationInput },
  data() {
    return {
      mode: "exam",
      modeList: [
        {
          type: "exam",
          text: "Exam",
        },
        {
          type: "flash-card",
          text: "Flash Card",
        },
      ],
      exam: {
        timeLimit: {
          enabled: false,
          second: 20 * 60,
        },
      },
      flashCard: {
        retryCountLimit: {
          enabled: false,
          count: 5,
        },
        questionTimeLimit: {
          enabled: false,
          second: 1 * 60,
        },
      },
      preference: {
        shuffleQuestions: false,
      },
    };
  },
  methods: {
    submit() {
      const preference = {
        type: this.mode,
        ...this.preference,
      };
      if (this.mode == "exam") {
        if (this.exam.timeLimit.enabled) {
          preference.examTimeSecond = this.exam.timeLimit.second;
        }
      } else if (this.mode == "flash-card") {
        if (this.flashCard.retryCountLimit.enabled) {
          preference.retryCount = this.flashCard.retryCountLimit.count;
        }

        if (this.flashCard.questionTimeLimit.enabled) {
          preference.questionTimeSecond =
            this.flashCard.questionTimeLimit.second;
        }
      }
      this.$emit("play", preference);
    },
  },
};
</script>
