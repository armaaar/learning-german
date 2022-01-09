import userEvent from "@testing-library/user-event";
import { cleanup, render, screen, within } from "solid-testing-library";
import {
  Word,
  WordType,
  NounTypeSubTypes,
  Languages,
} from "../../types/Word.type";
import { getSpeachMocks } from "../../utils/__tests__/textToSpeach.test";
import { enumToDescriptiveArray } from "../../utils/enumToArray";
import { EXAMPLES_TEST_ID, WordCard } from "./WordCard";

describe("WordCard", () => {
  const testEntry: Word = {
    word: "Auto",
    variations: ["Das Auto"],
    type: WordType.noun,
    subType: NounTypeSubTypes.neutral,
    english: "Car",
    arabic: "سيارة",
  };
  const matchingSearchEntries: Word[] = [
    {
      word: "Der Mann ist im Auto",
      type: WordType.sentence,
      english: "The man is in the car",
      arabic: "الرجل في السيارة",
    },
    {
      word: "Die Frau ist im Auto",
      type: WordType.sentence,
      english: "The woman is in the car",
      arabic: "المرأة في السيارة",
    },
  ];
  const unrelatedSearchEntries: Word[] = [
    {
      word: "Ja",
      type: WordType.affirmative,
      english: "yes",
      arabic: "نعم",
    },
    {
      word: "Nein",
      type: WordType.affirmative,
      english: "No",
      arabic: "لا",
    },
  ];

  const languages = enumToDescriptiveArray(Languages);

  const Component = () => (
    <WordCard
      entry={testEntry}
      searchEntries={[
        testEntry,
        ...matchingSearchEntries,
        ...unrelatedSearchEntries,
      ]}
    />
  );

  const { mockSpeech, restoreSpeech } = getSpeachMocks();

  function testWorkSpeach(word: string) {
    const { speakMock, speechSynthesisUtteranceMock } = mockSpeech();
    const element = screen.getByText(word);
    userEvent.click(element);
    expect(speechSynthesisUtteranceMock).toHaveBeenCalled();
    expect(speakMock).toHaveBeenCalled();
    restoreSpeech();
  }

  afterEach(cleanup);

  it("renders without crashing", () => {
    const { container } = render(Component);
    expect(container.firstElementChild).toBeInTheDocument();
  });

  it("renders word", () => {
    render(Component);
    expect(screen.queryByText(testEntry.word)).toBeInTheDocument();
  });

  it("speaks word", () => {
    render(Component);
    testWorkSpeach(testEntry.word);
  });

  it("renders variations", () => {
    render(Component);
    testEntry.variations?.forEach((variation) => {
      expect(screen.queryByText(variation)).toBeInTheDocument();
    });
  });

  it("speaks variations", () => {
    render(Component);
    testEntry.variations?.forEach((variation) => {
      testWorkSpeach(variation);
    });
  });

  it("renders type", () => {
    render(Component);
    expect(screen.queryByText(WordType[testEntry.type])).toBeInTheDocument();
  });

  it("renders sub type", () => {
    render(Component);
    expect(
      screen.queryByText(`(${NounTypeSubTypes[testEntry.subType]})`)
    ).toBeInTheDocument();
  });

  it("renders transations", () => {
    render(Component);
    languages.forEach((language) => {
      if (testEntry[language.value]) {
        expect(screen.queryAllByText(language.key)[0]).toBeInTheDocument();
        expect(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          screen.queryByText(testEntry[language.value]!)
        ).toBeInTheDocument();
      }
    });
  });

  describe("examples", () => {
    it("doesn't render self in examples", () => {
      render(Component);
      const examplesContainer = screen.getByTestId(EXAMPLES_TEST_ID);
      expect(
        within(examplesContainer).queryByText(testEntry.word)
      ).not.toBeInTheDocument();
    });
    it("doesn't render unrelated examples", () => {
      render(Component);
      const examplesContainer = screen.getByTestId(EXAMPLES_TEST_ID);
      unrelatedSearchEntries.forEach((entry) => {
        expect(
          within(examplesContainer).queryByText(entry.word)
        ).not.toBeInTheDocument();
      });
    });

    it("renders matched examples", () => {
      render(Component);
      const examplesContainer = screen.getByTestId(EXAMPLES_TEST_ID);
      matchingSearchEntries.forEach((entry) => {
        expect(
          within(examplesContainer).queryByText(entry.word)
        ).toBeInTheDocument();
      });
    });

    it("speaks examples", () => {
      render(Component);
      matchingSearchEntries.forEach((entry) => {
        testWorkSpeach(entry.word);
      });
    });

    it("renders examples' transations", () => {
      render(Component);
      languages.forEach((language) => {
        matchingSearchEntries.forEach((entry) => {
          if (entry[language.value]) {
            expect(
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              screen.queryByText(testEntry[language.value]!)
            ).toBeInTheDocument();
          }
        });
      });
    });
  });
});
