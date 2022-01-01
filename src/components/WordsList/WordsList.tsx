import { orderBy } from "lodash-es";
import { Component, createMemo, For } from "solid-js";
import { Word, WordType } from "../../types/Word.type";
import { ifTest } from "../../utils/ifTest";
import { WordCard } from "../WordCard/WordCard";
import styles from "./WordsList.module.scss";

type Props = {
  words: Word[];
};

export const WordsList: Component<Props> = (props) => {
  const groupedWords = createMemo(() => {
    // define results object
    const wordsObject: Record<string, Word[]> = {};

    // sort words
    const sortedWords = orderBy(props.words, ["type", "subType", "word"]);

    // organize words by type
    sortedWords.forEach((word) => {
      if (!Array.isArray(wordsObject[word.type])) {
        wordsObject[word.type] = [];
      }
      wordsObject[word.type].push(word);
    });

    return wordsObject;
  });

  return (
    <For each={Object.entries(groupedWords())}>
      {([type, words]) => (
        <div class={styles.typeList}>
          <h3 class={styles.typeName} data-testid={ifTest("words-list-type")}>
            {WordType[Number(type)]}
          </h3>
          <For each={words}>{(word) => <WordCard entry={word} />}</For>
        </div>
      )}
    </For>
  );
};
