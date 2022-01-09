export function textToSpeach(text: string): boolean {
  if (window === undefined || window.speechSynthesis === undefined) {
    return false; // Bail out
  }

  const msg = new window.SpeechSynthesisUtterance();
  msg.volume = 1;
  msg.rate = 0.8;
  msg.pitch = 0.8;
  msg.text = text;
  msg.lang = "de-DE";
  window.speechSynthesis.speak(msg);
  return true;
}
