import { Router, Routes, Route } from "solid-app-router";
import { lazy, Component } from "solid-js";
import { Simple } from "../layouts/Simple/Simple";

const Home = lazy(() => import("./Home/Home"));
const NotFound = lazy(() => import("./NotFound/NotFound"));

export const PagesRouter: Component = () => {
  return (
    <Simple>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*all" element={<NotFound />} />
        </Routes>
      </Router>
    </Simple>
  );
};
