import type { Word } from "./Word.type";

export const enum Courses {
  dfa = "DFA",
  lingoni = "Lingoni",
}

export type Lecture = {
  course: Courses;
  index: number;
  words: Word[];
};
