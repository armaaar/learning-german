import { Courses, Lecture } from "../types/Lecture.type";
import { NounTypeSubTypes, WordType } from "../types/Word.type";

export const LECTURES: Lecture[] = [
  {
    course: Courses.lingoni,
    index: 1,
    words: [
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
        word: "vielleicht",
        type: WordType.affirmative,
        english: "Maybe",
        arabic: "ربما",
      },
      {
        word: "Auto",
        variations: ["Das Auto"],
        type: WordType.noun,
        subType: NounTypeSubTypes.neutral,
        english: "Car",
        arabic: "سيارة",
      },
      {
        word: "Wo",
        type: WordType.interrogative,
        english: "Where",
        arabic: "أين",
      },
      {
        word: "Wo ist das Auto?",
        type: WordType.question,
        english: "Where is the car?",
        arabic: "أين السيارة؟",
      },
      {
        word: "Ich",
        type: WordType.pronoun,
        english: "I",
        arabic: "أنا",
      },
      {
        word: "Name",
        variations: ["Der Name"],
        type: WordType.noun,
        subType: NounTypeSubTypes.masculine,
        english: "Name",
        arabic: "إسم",
      },
      {
        word: "Ich lerne Deutsch.",
        type: WordType.sentence,
        english: "I learn German / I'm learning German",
        arabic: "أنا أتعلم الألمانية",
      },
      {
        word: "Lernen",
        variations: ["lerne", "lernst", "lernt"],
        type: WordType.verb,
        english: "Learn",
        arabic: "يتعلم",
      },
      {
        word: "Mann",
        variations: ["Der Mann"],
        type: WordType.noun,
        subType: NounTypeSubTypes.masculine,
        english: "Man",
        arabic: "رجل",
      },
      {
        word: "Frau",
        variations: ["Die Frau"],
        type: WordType.noun,
        subType: NounTypeSubTypes.feminine,
        english: "Woman",
        arabic: "امرأة",
      },
      {
        word: "im",
        more: "im => in dem",
        type: WordType.preposition,
        english: "in the",
        arabic: "في ال",
      },
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
    ],
  },
];
