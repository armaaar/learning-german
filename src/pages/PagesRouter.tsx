import { lazy, Component } from "solid-js";
import { Router, Routes, Route } from "solid-app-router";

const Home = lazy(() => import("./Home/Home"));
const NotFound = lazy(() => import("./NotFound/NotFound"));

export const PagesRouter: Component = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*all" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
