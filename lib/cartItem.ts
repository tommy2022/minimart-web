import { Product } from "./product";

export type CartItem = {
  product: Product; // 商品
  quantity: number; // 個数
};

export function addToCart(product: Product) {
  const storage: string | null = window.localStorage.getItem("cart");
  const cart: CartItem[] = storage !== null ? JSON.parse(storage) : [];
  let index: number = -1;
  console.log(cart);
  cart.forEach((item, i) => {
    if (item.product.id == product.id) {
      index = i;
    }
  });
  if (index != -1) {
    cart[index].quantity += 1;
  } else {
    const newItem: CartItem = {
      product: product,
      quantity: 1,
    };
    cart.push(newItem);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function getCart() {
  const storage = window.localStorage.getItem("cart");
  return storage !== null ? JSON.parse(storage) : [];
}

export function clearCart() {
  window.localStorage.clear();
  window.location.href = "/";
}
