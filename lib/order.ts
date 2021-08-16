import { graphqlRequest } from "./graphqlClient";

export type Items = {
  productId: string;
  quantity: number;
}[];

export type CreateOrderInput = {
  items: Items;
  pickupLocationId: string;
  clientMutationId: string;
};

const sendOrderQuery = `
  mutation sendOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      order {
        id
      }
    }
  }
`;

export async function sendOrder(input: CreateOrderInput): Promise<string> {
  const data = await graphqlRequest({ query: sendOrderQuery, variables: { input: input } });
  console.log(data);
  return data.createOrder.order.id;
}
