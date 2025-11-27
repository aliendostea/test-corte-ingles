//// View - rendering logic
import { elements } from "./view";
import { state } from "../state/state";

export const UIRenderer = {
  renderList: () => {
    elements.listContainer.replaceChildren();

    // Performance optimization: DocumentFragment
    const fragment = document.createDocumentFragment();

    state.items.forEach((item) => {
      const li = document.createElement("li");
      li.className = "li-list";

      const btn = document.createElement("button");
      btn.className = `item-list ${item.isSelected ? "active" : ""}`;
      btn.id = item.id;
      btn.textContent = item.value;

      li.appendChild(btn);
      fragment.appendChild(li);
    });

    elements.listContainer.appendChild(fragment);
    UIRenderer.toggleEmptyState();
  },

  toggleEmptyState: () => {
    const isEmpty = state.items.length === 0;
    elements.emptyState.classList.toggle("is-visible", isEmpty);
    elements.listContainer.classList.toggle("is-hidden", isEmpty);
  },

  showError: (target: HTMLElement, message: string) => {
    const span = document.createElement("span");
    span.className = "error-message";
    span.textContent = message;

    target.replaceChildren(span);

    if (target === elements.errorForm) {
      elements.input.classList.add("error-box");
    }
  },

  showOverlay: () => {
    elements.overlay.classList.remove("overlay-hidden-slide-top");
    elements.overlay.classList.add("overlay-show-slide-top");
  },
  hideOverlay: () => {
    elements.overlay.classList.add("overlay-hidden-slide-top");
    elements.overlay.classList.remove("overlay-show-slide-top");
  },

  clearErrors: () => {
    elements.errorForm.replaceChildren();
    elements.errorAction.replaceChildren();
    elements.input.classList.remove("error-box");
  },
};
