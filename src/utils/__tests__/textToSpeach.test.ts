import { textToSpeach } from "../textToSpeach";

export function getSpeachMocks() {
  const oldWindowSpeechSynthesis = window.speechSynthesis;
  const oldWindowSpeechSynthesisUtterance = window.SpeechSynthesisUtterance;

  function mockSpeech() {
    const speakMock = jest.fn();
    const speechSynthesisUtteranceMock = jest.fn();

    window.speechSynthesis = <SpeechSynthesis>{
      ...window.speechSynthesis,
      speak: speakMock,
    };
    window.SpeechSynthesisUtterance = speechSynthesisUtteranceMock;

    return {
      speakMock,
      speechSynthesisUtteranceMock,
    };
  }

  function restoreSpeech() {
    window.speechSynthesis = oldWindowSpeechSynthesis;
    window.SpeechSynthesisUtterance = oldWindowSpeechSynthesisUtterance;
  }

  return {
    mockSpeech,
    restoreSpeech,
  };
}

describe("textToSpeach", () => {
  const { mockSpeech, restoreSpeech } = getSpeachMocks();
  afterAll(restoreSpeech);

  it("is disabled if speechSynthesis doesn't exist", () => {
    const result = textToSpeach("Text to read");
    expect(result).toBe(false);
  });

  it("call speechSynthesis speak method", () => {
    const { speakMock, speechSynthesisUtteranceMock } = mockSpeech();
    const result = textToSpeach("Text to read");
    expect(result).toBe(true);
    expect(speechSynthesisUtteranceMock).toHaveBeenCalled();
    expect(speakMock).toHaveBeenCalled();
  });
});
