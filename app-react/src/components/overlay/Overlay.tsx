import { useShowOverlayStore } from "../../store/store";
import Button from "../button/Button";
import Card from "../card/Card";

import style from "./Overlay.module.css";

type OverlayProps = {
  children: React.ReactNode;
};

const ID_OVERLAY = "overlay";

export default function Overlay({ children }: OverlayProps) {
  const { showOverlay, setShowOverlay } = useShowOverlayStore();

  const overlayClass = [
    style.overlay,
    showOverlay && style["overlay-show-slide-top"],
    showOverlay === false && style["overlay-hidden-slide-top"],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      id={ID_OVERLAY}
      className={overlayClass}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if ((e.target as HTMLElement).id === ID_OVERLAY) setShowOverlay();
      }}
    >
      <Card variant="overlay">
        <h2 id="modal-title" className="modal-title">
          Add New item
        </h2>
        {children}
        <div className={style["btns-container-2"]}>
          <Button form="form" type="submit">
            Add
          </Button>
          <Button variant="secondary" onClick={() => setShowOverlay()}>
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
}
