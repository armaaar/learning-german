export function textToSpeach(text: string): void {
  const msg = new SpeechSynthesisUtterance();
  msg.volume = 1;
  msg.rate = 0.8;
  msg.pitch = 0.8;
  msg.text = text;
  msg.lang = "de-DE";
  speechSynthesis.speak(msg);
}
