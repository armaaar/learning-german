import { Word } from "../types/Word.type";
import { LECTURES } from "./lectures.data";

export const WORDS: Word[] = LECTURES.reduce<Word[]>(
  (words, lecture) => words.concat(lecture.words),
  []
);
