import style from "./ErrorMessage.module.css";

export default function ErrorMessage({ error }: { error: string | null }) {
  if (error) {
    return (
      <div role="alert">
        <span className={style["error-message"]}>{error}</span>{" "}
      </div>
    );
  }
  return null;
}
