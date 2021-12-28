import { render } from "solid-js/web";
import { PagesRouter } from "./pages/PagesRouter";

import "normalize.css";
import "./styles/styles.scss";

render(() => <PagesRouter />, document.getElementById("root") as HTMLElement);
