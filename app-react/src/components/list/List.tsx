import ListItem from "./ListItem";
import type { Item } from "../../utilities/types";

import style from "./List.module.css";

interface ListProps {
  items: Item[];
}

export default function List({ items }: ListProps) {
  const isEmptyList = items.length === 0;
  return (
    <ul className={style["list-container"]} aria-live="polite">
      {isEmptyList === false && items.map((item) => <ListItem key={item.id} item={item} />)}
      {isEmptyList && <span className={style["empty-list-elemet"]}>Add elements to get started</span>}
    </ul>
  );
}
