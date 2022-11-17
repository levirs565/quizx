import { QuestionAnswer } from "@quizx/shared";
import { ref } from "vue";

export function isAnswerEmpty(answer: QuestionAnswer | undefined) {
  if (answer == undefined) return true;

  if (typeof answer == "string" && answer.length == 0) return true;

  return false;
}

const CODEPOINT_A = "A".charCodeAt(0);
export function getChoiceIndex(index: number) {
  return String.fromCharCode(CODEPOINT_A + index);
}

export function calculateTimeLeftSecond(from: number): number {
  return (from - Date.now()) / 1000;
}

export function formatSecondTime(time: number): string {
  const minute = Math.floor(time / 60);
  const second = Math.floor(time % 60);
  return (
    minute.toString().padStart(2, "0") +
    ":" +
    second.toString().padStart(2, "0")
  );
}
export function selectOneUpper(value: string) {
  return value.charAt(0).toUpperCase();
}

export function useCountDownTimer() {
  const text = ref("");
  const started = ref(false);
  let interval: any;
  let endTime: number | undefined;
  let onEnd: Function | undefined;

  const tick = () => {
    const left = calculateTimeLeftSecond(endTime!!);
    if (left <= 0) {
      let callback = onEnd;
      stop();
      callback!!();
      return;
    }
    text.value = formatSecondTime(left);
  };

  const start = (timerEnd: number, endCallback: Function) => {
    stop();

    endTime = timerEnd;
    onEnd = endCallback;
    interval = setInterval(tick, 1000);
    tick();
    started.value = true;
  };

  const stop = () => {
    if (interval) {
      clearInterval(interval);
      interval = undefined;
    }

    onEnd = undefined;

    if (started) {
      started.value = false;
      text.value = formatSecondTime(0);
    }
  };

  return {
    start,
    stop,
    text,
    started,
  };
}
export class CounDownTimer {
  enabled: boolean;
  text: string;
  endTime?: number;
  interval?: number;
  onEnd: () => void;

  constructor(onEnd: () => void) {
    this.enabled = false;
    this.text = "";
    this.onEnd = onEnd;
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }

    if (this.enabled) {
      this.enabled = false;
      this.text = "";
    }
  }

  start(endTime: number) {
    this.stop();

    this.endTime = endTime;
    this.interval = setInterval(this.tick, 1000);
    this.tick();
    this.enabled = true;
  }

  tick = () => {
    const left = calculateTimeLeftSecond(this.endTime!!);
    if (left <= 0) {
      this.stop();
      this.onEnd();
      return;
    }
    this.text = formatSecondTime(left);
  };
}
