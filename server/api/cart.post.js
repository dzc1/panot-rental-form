import Stripe from "stripe";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("test", body);
  const stripeSecret = useRuntimeConfig().stripeSecret;
  const stripe = new Stripe(stripeSecret);

  const res = await stripe.products.list();
  //console.log(res);

  const lineItems = res.data.map((product) => ({
    price: product.default_price,
    quantity: 1,
  }));
  //console.log(product)
  //console.log(lineItems);
  const lineItemsTwo = [
    {
      price: body.products.default_price,
      quantity: body.products.quantity,
    },
  ];
  //console.log(lineItemsTwo);

  const session = await stripe.checkout.sessions.create({
    cancel_url: "http://localhost:3000",
    success_url:
      "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
    mode: "payment",
    line_items: lineItemsTwo,
  });

  return session;
});
