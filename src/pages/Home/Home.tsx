import type { Component } from "solid-js";
import { WordCard } from "../../components/WordCard/WordCard";
import { WORDS } from "../../data/words.data";

export const Home: Component = () => {
  return <WordCard entry={WORDS[12]} />;
};

export default Home;
