import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Product, getProduct } from "../../lib/product";
import { addToCart } from "../../lib/cart";
// import styles from "../product.module.css";

type Props = {
  incrementNumItems(): void;
  decrementNumItems(): void;
};

const ProductDetail: FC<Props> = ({ incrementNumItems, decrementNumItems }) => {
  const [product, setProduct] = useState<Product | null>(null);

  const router = useRouter();

  const handleAddCart = () => {
    if (product === null) return;
    console.log("Adding");
    addToCart(product);
    incrementNumItems();
  };

  useEffect(() => {
    if (typeof router.query.id === "string") {
      getProduct(router.query.id).then((product) => setProduct(product));
    }
  }, [router.query.id]);

  if (product === null) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>
        <img src={product.imageUrl} alt={`${product.name}の写真`} />
      </div>
      <div>
        <h1>{product.name}</h1>
        <div>{product.price}円</div>
        <div>{product.description}</div>
      </div>
      <button onClick={handleAddCart}>カートに追加する </button>
    </div>
  );
};

export default ProductDetail;
