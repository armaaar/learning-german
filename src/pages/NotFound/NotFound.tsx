import type { Component } from 'solid-js';

import styles from './NotFound.module.scss';

export const NotFound: Component = () => {
  return (
    <header class={styles.header}>
      <h1>404 Page not found</h1>
      <p>The page you are looking for doesn't exist</p>
    </header>
  );
};

export default NotFound;
