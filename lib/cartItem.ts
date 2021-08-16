import { Product } from "./product";

export type CartItem = {
  product: Product; // 商品
  quantity: number; // 個数
};

export function getCart() {
  const storage: string | null = window.localStorage.getItem("cart");
  return storage !== null ? JSON.parse(storage) : [];
}

export function addToCart(product: Product) {
  const cart: CartItem[] = getCart();
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

export function clearCart() {
  window.localStorage.clear();
  window.location.href = "/";
}

export function incrementQuantity(id: string) {
  const cart: CartItem[] = getCart();
  let index: number = -1;
  cart.forEach((item, i) => {
    if (item.product.id == id) {
      index = i;
    }
  });
  if (index == -1) {
    throw new Error("Incrementing item not in cart");
  }
  cart[index].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function decrementQuantity(id: string) {
  const cart: CartItem[] = getCart();
  let index: number = -1;
  cart.forEach((item, i) => {
    if (item.product.id == id) {
      index = i;
    }
  });
  if (index == -1) {
    throw new Error("Decrementing item not in cart");
  }
  cart[index].quantity -= 1;
  if (cart[index].quantity < 0) {
    throw new Error("Decrementing below 0.");
  } else if (cart[index].quantity == 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}
