import { Component, createMemo, For, Show } from "solid-js";
import {
  Languages,
  Word,
  WordType,
  NounTypeSubTypes,
} from "../../types/Word.type";
import { enumToDescriptiveArray } from "../../utils/enumToArray";
import { ifTest } from "../../utils/ifTest";
import { textToSpeach } from "../../utils/textToSpeach";
import styles from "./WordCard.module.scss";

type Props = {
  entry: Word;
  searchEntries: Word[];
};

export const EXAMPLES_TEST_ID = "words-card-example-word";

export const WordCard: Component<Props> = (props) => {
  // one time computed values
  const languages = enumToDescriptiveArray(Languages);

  // methods
  function speak(word: string): void {
    textToSpeach(word);
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

    return props.searchEntries.filter((entry) => {
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
        <Show when={props.entry.subType !== undefined}>
          <span class={styles.subType}>
            {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
            ({NounTypeSubTypes[props.entry.subType!]})
          </span>
        </Show>
      </div>

      {/* Word */}
      <h1 class={styles.word} onClick={() => speak(props.entry.word)}>
        {props.entry.word}
      </h1>

      {/* languages */}
      <Show when={languages.length}>
        <div class={styles.section}>
          <table class={styles.alignedList}>
            <tbody>
              <For each={languages}>
                {(language) => (
                  <Show when={props.entry[language.value]}>
                    <tr>
                      <th class={styles.alignedListHead}>{language.key}</th>
                      <td class={styles.alignedListData}>
                        {props.entry[language.value]}
                      </td>
                    </tr>
                  </Show>
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
        <div class={styles.section} data-testid={ifTest(EXAMPLES_TEST_ID)}>
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
                  <Show when={languages.length}>
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
