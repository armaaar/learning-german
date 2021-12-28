export enum Languages {
  english = "english",
  arabic = "arabic",
}

export enum WordType {
  word,
  job,
  verb,
  adjective,
  number,
  preposition,
  pronoun,
  affirmative,
  interrogative,
  question,
  sentence,
}

export enum WordTypeSubTypes {
  masculine,
  feminine,
  neutral,
}

export enum AdjectiveTypeSubTypes {
  general,
  color,
}

export type WordSubTypes = WordTypeSubTypes | AdjectiveTypeSubTypes;

export type Word = {
  word: string;
  more?: string;
  variations?: string[];
} & {
  [L in Languages]?: string;
} & (
    | {
        type: WordType.word;
        subType: WordTypeSubTypes;
      }
    | {
        type: WordType.adjective;
        subType: AdjectiveTypeSubTypes;
      }
    | {
        type: Exclude<WordType, WordType.word | WordType.adjective>;
        subType?: never;
      }
  );
