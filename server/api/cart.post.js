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
  // Extract relevant details from formSteps for notes
  // Address: ${body.formSteps.address.address}
  const customerNotes = `
Full Name: ${body.formSteps.fullName}
Passport Number: ${body.formSteps.passportNumber}
Email: ${body.formSteps.email}
Phone: ${body.formSteps.phoneContact}
Selected Bike: ${body.formSteps.selectedBike.name}
Selected City: ${body.formSteps.selectedCity ? "Costa Blanca" : "Costa Blanca"}
`; // Adjust this as per your requirements

  console.log(customerNotes);
  // Determine the environment and set the success_url using runtime config
  const isProduction = process.env.NODE_ENV === "production";
  const successUrl = isProduction
    ? productionSuccessURL
    : developmentSuccessURL;

  const session = await stripe.checkout.sessions.create({
    cancel_url: "http://localhost:3000", // Again, you might also want to set this conditionally for production and development environments
    // success_url: `${successUrl}/${body.formSteps.fullName}`,
    success_url: "https://panot-rental-form.vercel.app/congratulations",
    mode: "payment",
    line_items: lineItems,
    invoice_creation: {
      enabled: true,
      invoice_data: {
        description: customerNotes,
        metadata: {
          order: customerNotes,
        },
      },
    },
  });

  return session;
});
