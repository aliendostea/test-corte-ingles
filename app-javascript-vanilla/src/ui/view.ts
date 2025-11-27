//// View - DOM Elements

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
export { elements };
