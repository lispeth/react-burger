import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import styles from "./BurgerConstructorItem.module.css";
import { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import PropTypes from "prop-types";
import { IngredientType } from "../../utils/types";

const BurgerConstructorItem = ({
  item,
  index,
  text,
  type,
  handleClose,
  moveIngredient,
}) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "constructorItem",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // авто-скролл, если границы перетаскиваемого элемента выходят за видимую область
      const scrollContainer = ref.current.parentElement;
      const topOffset = 10;
      const bottomOffset = scrollContainer.clientHeight - 10;

      if (clientOffset.y < topOffset) {
        scrollContainer.scrollBy(0, -10);
      } else if (clientOffset.y > bottomOffset) {
        scrollContainer.scrollBy(0, 10);
      }
      moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "constructorItem",
    item: () => {
      return { item, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.5 : 1;
  drag(drop(ref));

  return (
    <div
      className={classNames(styles.ingredient_wrapper, "mt-4 mr-4")}
      style={{ opacity }}
      ref={ref}
    >
      <span
        className={styles.drag_icon_container}
        style={{ visibility: item.type === "bun" ? "hidden" : "visible" }}
      >
        <DragIcon type="primary" className={styles.drag_icon} />
      </span>
      <ConstructorElement
        type={type}
        text={text ? text : item.name}
        price={item.price}
        isLocked={item.type === "bun" ? true : item.isLocked}
        thumbnail={item.image}
        moveIngredient={moveIngredient}
        handleClose={() => handleClose(item)}
      />
    </div>
  );
};

export default BurgerConstructorItem;

BurgerConstructorItem.propTypes = {
  item: IngredientType.isRequired,
  index: PropTypes.number,
  text: PropTypes.string,
  type: PropTypes.oneOf(["top", "bottom"]),
  handleClose: PropTypes.func,
  moveIngredient: PropTypes.func,
};
