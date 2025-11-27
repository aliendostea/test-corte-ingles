import { useState } from "react";
import { useItemsStore, useShowOverlayStore } from "../../store/store";
import { ERROR_FORM_MESSAGES } from "../../utilities/const";
import ErrorMessage from "../messages/ErrorMessage";

import style from "./Form.module.css";

export default function Form() {
  const { add } = useItemsStore();
  const { setShowOverlay } = useShowOverlayStore();

  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const rawValue = formData.get("item");
    const value = typeof rawValue === "string" ? rawValue.trim() : "";

    if (!value) {
      setError(ERROR_FORM_MESSAGES.ERROR_EMPTY_INPUT);
      return;
    }

    if (value.length < 3) {
      setError(ERROR_FORM_MESSAGES.ERROR_INPUT_TOO_SHORT);
      return;
    }

    add(value);
    setShowOverlay();

    form.reset();
    setError(null);
  }

  const inputClass = error ? `${style["input-form"]} ${style["error-active"]}` : style["input-form"];

  return (
    <form id="form" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="input-item-list" className={style["label-form"]}>
        <span>Add item to list:</span>
        <input
          id="input-item-list"
          className={inputClass}
          placeholder="Type the text here..."
          type="text"
          name="item"
          minLength={3}
          maxLength={20}
          aria-describedby="error-form"
        />
      </label>
      <ErrorMessage error={error} />
    </form>
  );
}
