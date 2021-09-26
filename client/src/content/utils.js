export function isAnswerEmpty(answer) {
  if (answer == null) return true;

  if (typeof answer == "string" && answer.length == 0) return true;

  return false;
}
