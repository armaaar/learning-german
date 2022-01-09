export enum Languages {
  english = "english",
  arabic = "arabic",
}

export enum WordType {
  noun,
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

export enum NounTypeSubTypes {
  masculine,
  feminine,
  neutral,
}

export enum AdjectiveTypeSubTypes {
  general,
  color,
}

export type WordSubTypes = NounTypeSubTypes | AdjectiveTypeSubTypes;

export type Word = {
  word: string;
  more?: string;
  variations?: string[];
} & {
  [L in Languages]?: string;
} & (
    | {
        type: WordType.noun;
        subType: NounTypeSubTypes;
      }
    | {
        type: WordType.adjective;
        subType: AdjectiveTypeSubTypes;
      }
    | {
        type: Exclude<WordType, WordType.noun | WordType.adjective>;
        subType?: never;
      }
  );
