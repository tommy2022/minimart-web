import { FC, useState } from "react";
import { CartItem, incrementQuantity, decrementQuantity } from "../lib/cartItem";
import styles from "./Item.module.css";

type Props = {
  item: CartItem;
  incrementNumItems(): void;
  decrementNumItems(): void;
  reflectTotal(arg1: number, arg2: -1 | 1): void;
};

const Item: FC<Props> = ({ item, incrementNumItems, decrementNumItems, reflectTotal }) => {
  const { imageUrl, name, price } = item.product;
  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    incrementNumItems();
    incrementQuantity(item.product.id);
    reflectTotal(item.product.price, 1);
  };

  const handleDecrement = () => {
    setQuantity(quantity - 1);
    decrementNumItems();
    decrementQuantity(item.product.id);
    reflectTotal(item.product.price, -1);
  };

  if (quantity == 0) {
    return null;
  }

  return (
    <div className={styles.itemWrapperStyle}>
      <img className={styles.image} src={imageUrl} alt={`${name}の写真`} />
      <div className={styles.itemInfo}>
        <div className={styles.productName}>{name}</div>
        <div className={styles.price}>{price}円</div>
        <div>
          <div className={styles.quantity}> {quantity}個 </div>
          <button onClick={handleIncrement}>+</button>
          <button onClick={handleDecrement} disabled={quantity == 0}>
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
