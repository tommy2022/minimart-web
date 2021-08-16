import React from "react";
import { useRouter } from "next/router";

function OrderDetail() {
  const router = useRouter();
  return <div>あああああ　終わらなんかった。。。 orderId は {router.query.id}ですw</div>;
}

export default OrderDetail;
