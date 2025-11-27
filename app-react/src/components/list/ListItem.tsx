import { useItemsStore } from "../../store/store";
import Button from "../button/Button";
import type { Item } from "../../utilities/types";

import style from "./List.module.css";

type ListItemProps = {
  item: Item;
};

export default function ListItem({ item }: ListItemProps) {
  const { toggleSelect } = useItemsStore();
  const isActive = item.isSelected;
  const classNameItem = `${style["item-list"]} ${isActive ? style.active : ""}`;
  return (
    <li className={style["li-list"]}>
      <Button
        id={item.id}
        className={classNameItem}
        onClick={() => toggleSelect(item.id)}
        aria-pressed={item.isSelected}
      >
        {item.value}
      </Button>
    </li>
  );
}
