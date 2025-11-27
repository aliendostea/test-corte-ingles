import "./style.css";

type Item = {
  id: string;
  value: string;
  isSelected: boolean;
};

const state = {
  items: [] as Item[],
  deletedItems: [] as Item[],
};

const StateActions = {
  add: (value: string) => {
    const newItem = {
      id: window.crypto.randomUUID(),
      value,
      isSelected: false,
    };
    state.items = [...state.items, newItem];
  },

  toggleSelect: (value: string, id: string) => {
    const item = state.items.find((i) => i.id === id && i.value === value);

    if (item) item.isSelected = !item.isSelected;
  },

  deleteSelected: () => {
    const selected = state.items.filter((i) => i.isSelected);
    if (selected.length === 0) throw new Error("No items selected");

    state.deletedItems = selected.map((i) => ({ ...i, isSelected: false }));
    state.items = state.items.filter((i) => !i.isSelected);
  },

  recover: () => {
    if (state.deletedItems.length === 0) throw new Error("Nothing to recover");

    state.items = [...state.items, ...state.deletedItems];
    state.deletedItems = [];
  },
};

const elements = {
  form: document.getElementById("form") as HTMLFormElement,
  input: document.getElementById("input-item-list") as HTMLInputElement,
  listContainer: document.getElementById("list-container") as HTMLElement,
  btnDelete: document.getElementById("delete-elements") as HTMLButtonElement,
  btnRecover: document.getElementById("to-recover-elements") as HTMLButtonElement,
  errorForm: document.getElementById("error-form") as HTMLElement,
  errorAction: document.getElementById("error-action-btn") as HTMLElement,
  emptyState: document.getElementById("empty-list-elemet") as HTMLElement,
  overlay: document.getElementById("overlay") as HTMLElement,
  btnShow: document.getElementById("btn-overlay-show") as HTMLButtonElement,
};

const UIRenderer = {
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

  // LIST CLICKS (Delegation)
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

initListeners();
UIRenderer.toggleEmptyState();

//// code structure and organization
//// keyboard navigation
//// accessibility
//// performance optimization
//// change CSS classes for Vars
//// cross-browser compatibility
//// localstorage
//// focus states
