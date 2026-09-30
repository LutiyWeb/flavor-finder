import React from "react";
import FlavorFinder from "./components/FlavorFinder";

export default function App() {
  return React.createElement(
    "div",
    {
      style: {
        background: "#8a77d3",
        minHeight: "100vh",
        padding: "40px 16px",
      },
    },
    React.createElement("div", { "data-flavor-finder": "" }, React.createElement(FlavorFinder)),
  );
}
