import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Product, getProduct } from "../../lib/product";
import { CartItem, getCart, clearCart } from "../../lib/cartItem";
// import styles from "../product.module.css";

type Props = {};

const Cart: FC<Props> = ({ decrementNumItems }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleOrder = () => {
    clearCart();
    window.alert("注文しました！");
  };

  let total = 0;
  cart.forEach((item) => {
    total += item.quantity * item.product.price;
  });

  return (
    <div>
      <div>
        {cart.map((item) => (
          <div key={item.product.id}>
            <h1>{item.product.name}</h1>
            <img src={item.product.imageUrl} alt={`${item.product.name}の写真`} />
            <div>{item.product.price}円</div>
            <div>{item.quantity}個</div>
          </div>
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
