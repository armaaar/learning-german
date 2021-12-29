import { Component, For } from "solid-js";
import styles from "./NavList.module.scss";

type Props = {
  list: string[];
  onSelect: (item: string) => void;
};

export const NavList: Component<Props> = (props) => (
  <nav class={styles.nav}>
    <ul class={styles.list}>
      <For each={props.list}>
        {(item) => (
          <li
            role="button"
            tabIndex={0}
            class={styles.item}
            onClick={() => props.onSelect(item)}
          >
            {item}
          </li>
        )}
      </For>
    </ul>
  </nav>
);
