export function isAnswerEmpty(answer) {
  if (answer == null) return true;

  if (typeof answer == "string" && answer.length == 0) return true;

  return false;
}

const CODEPOINT_A = "A".charCodeAt(0);
export function getChoiceIndex(index) {
  return String.fromCharCode(CODEPOINT_A + index);
}
