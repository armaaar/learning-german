import type { Word } from "./Word.type";

export enum Courses {
  dfa = "DFA",
  lingoni = "Lingoni",
}

export type Lecture = {
  course: Courses;
  index: number;
  words: Word[];
};
