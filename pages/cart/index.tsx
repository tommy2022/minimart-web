import { FC, useState, useEffect } from "react";
import { CartItem, getCart, clearCart } from "../../lib/cartItem";
import Item from "../../components/Item";

type Props = {
  incrementNumItems(): void;
  decrementNumItems(): void;
};

const Cart: FC<Props> = ({ incrementNumItems, decrementNumItems }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleOrder = () => {
    clearCart();
    window.alert("注文しました！");
  };

  const reflectTotal = (price: number, direction: -1 | 1) => {
    setTotal(total + price * direction);
  };

  useEffect(() => {
    let temp_total: number = 0;
    cart.forEach((item) => {
      temp_total += item.quantity * item.product.price;
    });
    setTotal(temp_total);
  }, [cart]);

  return (
    <div>
      <div>
        {cart.map((item) => (
          <Item
            item={item}
            incrementNumItems={incrementNumItems}
            decrementNumItems={decrementNumItems}
            reflectTotal={reflectTotal}
            key={item.product.id}
          />
        ))}
      </div>
      <div>
        <div>合計: {total}円</div>
        <button onClick={handleOrder} disabled={total == 0}>
          注文する
        </button>
      </div>
    </div>
  );
};

export default Cart;
