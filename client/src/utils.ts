export function isAnswerEmpty(answer: string | number | null) {
  if (answer == null) return true;

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
  const second = Math.round(time - minute * 60);
  return (
    minute.toString().padStart(2, "0") +
    ":" +
    second.toString().padStart(2, "0")
  );
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
