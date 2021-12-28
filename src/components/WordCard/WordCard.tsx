import { Component, createMemo, For, Show } from "solid-js";
import { WORDS } from "../../data/words.data";
import {
  Languages,
  Word,
  WordType,
  WordTypeSubTypes,
} from "../../types/Word.type";
import { enumToDescriptedArray } from "../../utils/enumToArray";
import { textToSpeach } from "../../utils/textToSpeach";
import styles from "./WordCard.module.scss";

type Props = {
  entry: Word;
};

export const WordCard: Component<Props> = (props) => {
  // one time computed values
  const languages = enumToDescriptedArray(Languages);

  // methods
  function speak(word: string): void {
    textToSpeach(word || props.entry.word);
  }

  const cleanWord = (word: string): string =>
    word.replace(/[^\w\s]/g, "").toLowerCase();

  // conputed values
  const cleanWordVariations = () => {
    const variations = [cleanWord(props.entry.word)];
    if (props.entry.variations) {
      variations.push(
        ...props.entry.variations.map((variation) => cleanWord(variation))
      );
    }
    return variations;
  };

  const examples = createMemo(() => {
    const searchFor = cleanWordVariations();

    return WORDS.filter((entry) => {
      // Filter exact work
      if (entry.word === props.entry.word) return false;

      // create array of words to search in
      const searchIn = [entry.word, ...(entry?.variations ?? [])];
      for (const sentence of searchIn) {
        const words = cleanWord(sentence).split(" ");
        for (const word of words) {
          if (searchFor.includes(word)) {
            return true;
          }
        }
      }

      return false;
    });
  });

  return (
    <div class={styles.card}>
      {/* Type */}
      <div class={styles.typesContainer}>
        <span>{WordType[props.entry.type]}</span>
        <Show when={props.entry.subType}>
          <span class={styles.subType}>
            {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
            {WordTypeSubTypes[props.entry.subType!]}
          </span>
        </Show>
      </div>

      {/* Word */}
      <h1 class={styles.word} onClick={() => speak(props.entry.word)}>
        {props.entry.word}
      </h1>

      {/* languages */}
      <Show when={languages?.length}>
        <div class={styles.section}>
          <table class={styles.alignedList}>
            <tbody>
              <For each={languages}>
                {(language) => (
                  <tr>
                    <th class={styles.alignedListHead}>{language.key}</th>
                    <td class={styles.alignedListData}>
                      {props.entry[language.value]}
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </Show>

      {/* Variations */}
      <Show when={props.entry.variations?.length}>
        <div class={styles.section}>
          <h2 class={styles.title}>Variations</h2>
          <ul>
            <For each={props.entry.variations}>
              {(variation) => (
                <li>
                  <span
                    class={styles.word_small}
                    onClick={() => speak(variation)}
                  >
                    {variation}
                  </span>
                </li>
              )}
            </For>
          </ul>
        </div>
      </Show>

      {/* Examples */}
      <Show when={examples().length}>
        <div class={styles.section}>
          <h2 class={styles.title}>Examples</h2>
          <For each={examples()}>
            {(example) => (
              <table class={styles.alignedList}>
                <tbody>
                  <tr>
                    <td
                      colSpan={2}
                      class={styles.word_small}
                      onClick={() => speak(example.word)}
                    >
                      {example.word}
                    </td>
                  </tr>
                  <Show when={languages?.length}>
                    <For each={languages}>
                      {(language) => (
                        <tr>
                          <th class={styles.alignedListHead}>{language.key}</th>
                          <td class={styles.alignedListData}>
                            {example[language.value]}
                          </td>
                        </tr>
                      )}
                    </For>
                  </Show>
                </tbody>
              </table>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};
