import { cleanup, render, screen } from "solid-testing-library";
import { Word, WordType, NounTypeSubTypes } from "../../types/Word.type";
import { WordsList } from "./WordsList";

describe("WordsList", () => {
  const testWords: Word[] = [
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
    {
      word: "der Mann",
      type: WordType.noun,
      subType: NounTypeSubTypes.masculine,
      english: "Man",
      arabic: "رجل",
    },
    {
      word: "die Frau",
      type: WordType.noun,
      subType: NounTypeSubTypes.feminine,
      english: "Woman",
      arabic: "امرأة",
    },
  ];
  const orderedTestTypes = testWords
    .reduce<WordType[]>((types, word) => {
      if (!types.includes(word.type)) {
        types.push(word.type);
      }
      return types;
    }, [])
    .sort((a, b) => a - b);

  const Component = () => <WordsList words={testWords} />;

  afterEach(cleanup);

  it("renders without crashing", () => {
    const { container } = render(Component);
    expect(container.firstElementChild).toBeInTheDocument();
  });

  it("render all types", () => {
    render(Component);
    const renderedTypes = screen.getAllByTestId("words-list-type");
    expect(renderedTypes).toHaveLength(orderedTestTypes.length);
    orderedTestTypes.forEach((type, index) => {
      expect(renderedTypes[index]).toHaveTextContent(WordType[type]);
    });
  });

  it("render all words", () => {
    render(Component);
    testWords.forEach((entry) => {
      const word = screen.getByText(entry.word);
      expect(word).toBeInTheDocument();
    });
  });
});
