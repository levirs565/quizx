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
        item-text="text"
        label="Mode"
        outlined
        hide-details
      />
      <template v-if="mode == 'exam'">
        <v-switch label="Limit Exam Time" v-model="exam.timeLimit.enabled" />
        <v-text-field
          label="Exam Time Limit"
          type="number"
          suffix="minute"
          v-show="exam.timeLimit.enabled"
          v-model="exam.timeLimit.minute"
          outlined
          hide-details
        />
      </template>
      <template v-if="mode == 'flash-card'">
        <v-switch
          label="Limit Question Time"
          v-model="flashCard.questionTimeLimit.enabled"
        />
        <v-text-field
          label="Exam Question Limit"
          type="number"
          suffix="minute"
          v-show="flashCard.questionTimeLimit.enabled"
          v-model="flashCard.questionTimeLimit.minute"
          outlined
          hide-details
        />
        <v-switch
          label="Limit Retry Count"
          v-model="flashCard.retryCountLimit.enabled"
        />
        <v-text-field
          label="Retry Count Limit"
          type="number"
          v-show="flashCard.retryCountLimit.enabled"
          v-model="flashCard.retryCountLimit.count"
          outlined
          hide-details
        />
      </template>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn text @click="$emit('close')">Cancel</v-btn>
      <v-btn color="primary" @click="submit">Play Now</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
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
          minute: 20,
        },
      },
      flashCard: {
        retryCountLimit: {
          enabled: false,
          count: 5,
        },
        questionTimeLimit: {
          enabled: false,
          minute: 1,
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
          preference.examTimeMinute = this.exam.timeLimit.minute;
        }
      } else if (this.mode == "flash-card") {
        if (this.flashCard.retryCountLimit.enabled) {
          preference.retryCount = this.flashCard.retryCountLimit.count;
        }

        if (this.flashCard.questionTimeLimit.enabled) {
          preference.questionTimeMinute =
            this.flashCard.questionTimeLimit.minute;
        }
      }
      this.$emit("play", preference);
    },
  },
};
</script>
