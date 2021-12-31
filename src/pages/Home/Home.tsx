import type { Component } from "solid-js";
import { ModeSelector } from "../../components/ModeSelector/ModeSelector";
import { WordCard } from "../../components/WordCard/WordCard";
import { WORDS } from "../../data/words.data";

export const Home: Component = () => {
  return (
    <>
      <ModeSelector modes={["Words", "Courses"]} />
      <WordCard entry={WORDS[12]} />
    </>
  );
};

export default Home;
