import React from "react";
import { createRoot } from "react-dom/client";

const main = (
  <main>
    <h1>Main Heading</h1>
    <article>
      <h2>Article Heading</h2>
      <p>This is the article body</p>
    </article>
  </main>
);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(main);
