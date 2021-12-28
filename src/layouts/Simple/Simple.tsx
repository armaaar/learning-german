import { Component } from "solid-js";
import styles from "./Simple.module.scss";

export const Simple: Component = (props) => {
  return <div className={styles.container}>{props.children}</div>;
};
