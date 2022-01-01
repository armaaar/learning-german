import type { Component } from "solid-js";
import { ModeSelector } from "../../components/ModeSelector/ModeSelector";
import { WordsList } from "../../components/WordsList/WordsList";
import { WORDS } from "../../data/words.data";

export const Home: Component = () => {
  return (
    <>
      <ModeSelector modes={["Words", "Courses"]} />
      <WordsList words={WORDS} />
    </>
  );
};

export default Home;
