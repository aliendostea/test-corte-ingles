import { StateActions, state } from "./state/state";
import { UIRenderer } from "./ui/renderer";
import { elements } from "./ui/view";

import "./global.css";
import "./style.css";

function initListeners() {
  // FORM SUBMIT
  elements.form.addEventListener("submit", (e) => {
    e.preventDefault();
    UIRenderer.clearErrors();

    const formData = new FormData(elements.form);
    const value = formData.get("item")?.toString().trim();

    if (!value) {
      UIRenderer.showError(elements.errorForm, "Error: Input cannot be empty");
      return;
    }

    StateActions.add(value);
    UIRenderer.renderList();
    UIRenderer.hideOverlay();
    elements.form.reset();
  });

  // LIST CLICKS
  elements.listContainer.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "BUTTON" && target.textContent) {
      StateActions.toggleSelect(target.textContent, target.id);
      UIRenderer.renderList();
    }
  });

  // DELETE BUTTON
  elements.btnDelete.addEventListener("click", () => {
    UIRenderer.clearErrors();
    try {
      StateActions.deleteSelected();
      UIRenderer.renderList();
    } catch (error: any) {
      const msg = state.items.length === 0 ? "Error: Empty list." : "Error: Select an item first.";
      UIRenderer.showError(elements.errorAction, msg);
    }
  });

  // RECOVER BUTTON
  elements.btnRecover.addEventListener("click", () => {
    UIRenderer.clearErrors();
    try {
      StateActions.recover();
      UIRenderer.renderList();
    } catch (error) {
      UIRenderer.showError(elements.errorAction, "Error: No items to recover.");
    }
  });

  elements.btnShow.addEventListener("click", () => {
    UIRenderer.showOverlay();
  });

  elements.overlay.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    if (target.id === "btn-overlay-cancel" || target.id === "overlay") {
      UIRenderer.hideOverlay();
    }
  });
}

function initApp() {
  initListeners();
  UIRenderer.toggleEmptyState();
}

document.addEventListener("DOMContentLoaded", initApp);
// Next features to implement:
//// keyboard navigation
//// change CSS classes for Vars in JS
//// localstorage
