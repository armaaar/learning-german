import { Component, For } from "solid-js";
import { ifTest } from "../../utils/ifTest";
import styles from "./NavList.module.scss";

type Props = {
  list: string[];
  selected?: string;
  onSelect?: (item: string) => void;
};

export const SELECTED_ITEM_TEST_ID = "selected-nav-item";

export const NavList: Component<Props> = (props) => {
  const isSelected = (item: string) => item === props.selected;

  return (
    <nav class={styles.nav}>
      <ul class={styles.list}>
        <For each={props.list}>
          {(item) => (
            <li
              role="button"
              tabIndex={0}
              class={styles.item}
              classList={{ [styles.selected]: isSelected(item) }}
              onClick={() => !isSelected(item) && props.onSelect?.(item)}
              data-testid={ifTest(
                isSelected(item) ? SELECTED_ITEM_TEST_ID : undefined
              )}
            >
              {item}
            </li>
          )}
        </For>
      </ul>
    </nav>
  );
};
