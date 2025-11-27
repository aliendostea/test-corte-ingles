import { useState } from "react";
import { useItemsStore, useShowOverlayStore } from "../../store/store";
import Button from "../button/Button";
import IconRecover from "../icons/IconRecover";
import ErrorMessage from "../messages/ErrorMessage";
import { ERROR_MESSAGES } from "../../utilities/const";

import styles from "./BottomControls.module.css";

export default function BottomControls() {
  const { deleteSelected, recover, items } = useItemsStore();
  const { setShowOverlay } = useShowOverlayStore();

  const [actionError, setActionError] = useState<string | null>(null);

  function handleDelete() {
    setActionError(null);
    try {
      deleteSelected();
    } catch (error) {
      const msg = items.length === 0 ? ERROR_MESSAGES.ERROR_EMPTY_LIST : ERROR_MESSAGES.ERROR_DELETING_ITEMS;
      setActionError(msg);
      console.log("error:", error);
    }
  }

  function handleRecover() {
    setActionError(null);
    try {
      recover();
    } catch (error) {
      setActionError(ERROR_MESSAGES.ERROR_RECOVERING_ITEMS);
      console.log("error:", error);
    }
  }

  return (
    <>
      <ErrorMessage error={actionError} />

      <div className={styles["btns-container"]}>
        <Button
          variant="secondary"
          icon
          aria-label="Recover deleted items"
          title="Recover Items"
          onClick={handleRecover}
        >
          <IconRecover />
        </Button>

        <Button variant="secondary" onClick={handleDelete}>
          Delete
        </Button>

        <Button onClick={setShowOverlay}>Add</Button>
      </div>
    </>
  );
}
