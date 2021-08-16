import { FC, useState, useEffect } from "react";
import { CartItem, getCart, clearCart } from "../../lib/cart";
import Item from "../../components/Item";
import { Items, CreateOrderInput, sendOrder } from "../../lib/order";

type Props = {
  incrementNumItems(): void;
  decrementNumItems(): void;
};

const Cart: FC<Props> = ({ incrementNumItems, decrementNumItems }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const temp_cart: CartItem[] = getCart();
    setCart(temp_cart);

    let temp_total: number = 0;
    temp_cart.forEach((item) => {
      temp_total += item.quantity * item.product.price;
    });
    setTotal(temp_total);
  }, []);

  const reflectTotal = (price: number, direction: -1 | 1) => {
    setTotal(total + price * direction);
  };

  const handleOrder = () => {
    // 多分 Itemコンポーネント変更時にcart stateに反映させる方がいいのかな
    const updatedCart: CartItem[] = getCart();
    const items: Items = updatedCart.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));

    clearCart();

    // TODO 以下のハードコードを直す
    const orderInput: CreateOrderInput = {
      items: items,
      pickupLocationId: "UGlja3VwTG9jYXRpb24tMQ==",
      clientMutationId: "abcde",
    };

    console.log(orderInput);

    sendOrder(orderInput).then((id) => {
      console.log(id);
      window.location.href = `/order/${id}`;
    });
  };

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
