import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import FlavorFinder from "./components/FlavorFinder";

function mount() {
  document.querySelectorAll<HTMLElement>("[data-flavor-finder]").forEach((el) => {
    if (el.dataset.flavorFinderMounted) return;
    el.dataset.flavorFinderMounted = "true";
    createRoot(el).render(
      <StrictMode>
        <FlavorFinder />
      </StrictMode>,
    );
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}
