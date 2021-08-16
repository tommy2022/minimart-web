import React, { FC, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./Layout.module.css";

type Props = { children: React.ReactNode };

export const Layout: FC<Props> = ({ children }) => {
  const [numItems, setNumItems] = useState<number>(0);

  useEffect(() => {
    const storage: string | null = window.localStorage.getItem("numItems");
    const num = storage !== null ? parseInt(storage) : 0;
    setNumItems(num);
  }, []);

  const incrementNumItems = () => {
    setNumItems(numItems + 1);
    window.localStorage.setItem("numItems", (numItems + 1).toString());
  };

  const decrementNumItems = () => {
    setNumItems(numItems - 1);
    window.localStorage.setItem("numItems", (numItems - 1).toString());
  };

  const clearCart = () => {
    setNumItems(0);
    window.localStorage.clear();
  };

  const childrenWithProps = React.cloneElement(children, {
    incrementNumItems: incrementNumItems,
    decrementNumItems: decrementNumItems,
    clearCart: clearCart,
  });
  return (
    <div>
      <Head>
        <title>Mini Mart</title>
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <Link href="/">Mini Mart</Link>
        </h1>
        <div className={styles.cart}>
          {/* このリンク先はないので新規ページを作る */}
          <Link href="/cart">
            <a>
              <span>🛒</span>
              <span className={styles.cartCount}>({numItems})</span>
            </a>
          </Link>
        </div>
      </header>
      <main>{childrenWithProps}</main>
    </div>
  );
};
