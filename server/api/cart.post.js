import Stripe from "stripe";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("test", body);
  //const stripeSecret = useRuntimeConfig().stripeSecret;

  const { stripeSecret, productionSuccessURL, developmentSuccessURL } =
    useRuntimeConfig();
  const stripe = new Stripe(stripeSecret);

  const res = await stripe.products.list();
  //console.log(res);

  //console.log(product)
  //console.log(lineItems);
  const lineItems = [
    {
      price: body.products.default_price,
      quantity: body.products.quantity,
    },
  ];
  //console.log(lineItemsTwo);

  // Determine the environment and set the success_url using runtime config
  const isProduction = process.env.NODE_ENV === "production";
  const successUrl = isProduction
    ? productionSuccessURL
    : developmentSuccessURL;

  const session = await stripe.checkout.sessions.create({
    cancel_url: "http://localhost:3000", // Again, you might also want to set this conditionally for production and development environments
    success_url: successUrl,
    mode: "payment",
    line_items: lineItems,
  });

  return session;
});
