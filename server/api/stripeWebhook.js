import Stripe from "stripe";

export default defineEventHandler(async (event) => {
  const { stripeSecret, stripeWebhookSecret } = useRuntimeConfig();
  const stripe = new Stripe(stripeSecret);

  if (event.method === "POST") {
    let stripeEvent;

    try {
      // Verify the event by extracting the signature from the request header
      const sig = event.headers["stripe-signature"];
      stripeEvent = stripe.webhooks.constructEvent(
        event.body,
        sig,
        stripeWebhookSecret
      );
    } catch (err) {
      throw new Error(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (stripeEvent.type) {
      case "checkout.session.completed":
        const session = stripeEvent.data.object;
        // Handle successful checkout session (e.g., save order in database)
        break;
      // Add more cases for other event types
      default:
        throw new Error("Unhandled event type");
    }

    // Return a response to acknowledge receipt of the event
    return { received: true };
  } else {
    throw new Error("Method Not Allowed");
  }
});
