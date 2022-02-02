<template>
  <v-app>
    <molecule-app-bar :isLoading="state && state.isLoading">
      <v-toolbar-title>Game</v-toolbar-title>
    </molecule-app-bar>
    <organism-resource-main :state="state" @reload="updateState">
      <v-container>
        <v-row>
          <v-col
            cols="3"
            :style="{ position: 'sticky', top: sidebarTop }"
            align-self="start"
          >
            <v-card>
              <v-card-text
                class="text-center text--primary pb-0"
                v-if="timer.show"
              >
                <span class="text-h5">{{ timer.timeLeftText }}</span>
              </v-card-text>
              <jumper
                :buttons="jumperButtons"
                @click="goToQuestion"
              ></jumper>
            </v-card>
          </v-col>
          <v-col>
            <h1 class="text-h4 mb-4">{{ game.quizTitle }}</h1>

            <v-row dense>
              <v-col
                cols="12"
                v-for="(question, index) in questions"
                :key="question.id"
              >
                <question
                  :index="index"
                  :question="question"
                  :initialAnswer="question.answer"
                  @answerChanged="answerChanged"
                  ref="questions"
                >
                </question>
              </v-col>
            </v-row>

            <v-dialog v-model="isFinishDialogShow" max-width="350px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="mt-4" color="error" v-on="on" v-bind="attrs">
                  Finish
                </v-btn>
              </template>
              <v-card>
                <v-card-title>Finish Game?</v-card-title>
                <v-card-text
                  >Make sure all questions are answered correctly.</v-card-text
                >
                <v-card-actions>
                  <v-spacer />
                  <v-btn text @click="isFinishDialogShow = false">Cancel</v-btn>
                  <v-btn text color="error" @click="finish">Finish</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-container>
    </organism-resource-main>
  </v-app>
</template>

<script>
import { Game } from "@/api";
import Question from "@/components/Question.vue";
import Jumper from "@/components/MoleculeJumper.vue";
import { isAnswerEmpty } from "@/utils";
import { updateResourceStateByPromise } from "@/components/ResourceWrapper.vue";
import MoleculeAppBar from "@/components/MoleculeAppBar.vue";
import OrganismResourceMain from "@/components/OrganismResourceMain.vue";

export default {
  components: {
    Question,
    Jumper,
    MoleculeAppBar,
    OrganismResourceMain,
  },
  props: {
    game_id: String,
  },
  data() {
    return {
      game: {},
      lastQuestionResult: 0,
      questions: [],
      jumperButtons: [],
      state: null,
      isFinishDialogShow: false,
      timer: {
        show: false,
        timeLeftText: "",
        maxTime: 0,
        interval: 0,
      },
    };
  },
  methods: {
    answerChanged(data) {
      let answer = data.answer;
      let id = data.question.id;
      this.$set(this.jumperButtons, data.index, this.getQuestionColor(answer));
      Game.putAnswer(this.game_id, id, answer).then((val) => {
        if (this.game.isInteractive) {
          // TODO: Untuk permainan interaktif
          // Contoh khan academeny
          // Hanya 2 Soal saja yang tampil
          this.lastQuestionResult = val.correct ? 2 : 1;
          setTimeout(() => {
            this.lastQuestionResult = 0;
            if (val.correct) {
              // TODO: seperti di tatas
              this.nextSoal();
            }
          }, 1000);
        }
      });
    },
    updateState() {
      updateResourceStateByPromise(
        Game.getGame(this.game_id).then((val) => {
          this.game = val;

          if (!this.game.isPlaying) return;

          this.questions = val.questions;
          this.jumperButtons = this.questions.map((question) =>
            this.getQuestionColor(question.answer)
          );

          if (val.data.type === "exam") {
            if (val.data.maxFinishTime) {
              this.timer.show = true;
              this.timer.maxTime = new Date(val.data.maxFinishTime).getTime();
              this.timerTick();
              this.timer.interval = setInterval(this.timerTick, 1000);
            }
          }
        }),
        (val) => {
          this.state = val;
        }
      );
    },
    timerTick() {
      const timeLeft = (this.timer.maxTime - Date.now()) / 1000;
      if (timeLeft <= 0) this.finish();
      const minute = Math.floor(timeLeft / 60);
      const second = Math.round(timeLeft - minute * 60);
      this.timer.timeLeftText =
        minute.toString().padStart(2, "0") +
        ":" +
        second.toString().padStart(2, "0");
    },
    getQuestionColor(answer) {
      if (!isAnswerEmpty(answer)) return "primary";
      return "";
    },
    finish() {
      Game.finishGame(this.game_id).then(() => {
        this.$router.replace(`/game/${this.game_id}/`);
      });
    },
    getElementTop(el) {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      return el.getBoundingClientRect().top + scrollY;
    },
    goToQuestion(index) {
      const element = this.$refs.questions[index].$el;
      const top = this.getElementTop(element) - this.$vuetify.application.top;
      window.scrollTo(0, top);
    },
  },
  mounted() {
    this.updateState();
  },
  beforeDestroy() {
    if (this.timer.interval) clearInterval(this.timer.interval);
  },
  computed: {
    sidebarTop() {
      return this.$vuetify.application.top + "px";
    },
  },
};
</script>

<style scoped></style>
