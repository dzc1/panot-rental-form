import Stripe from "stripe";

export default defineEventHandler(async (event) => {
  const { stripeSecret } = useRuntimeConfig();
  const stripe = new Stripe(stripeSecret);

  if (event.method === "GET") {
    const sessionId = event.query.session_id;

    if (!sessionId) {
      throw new Error("Session ID is required");
    }

    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      return { session };
    } catch (err) {
      throw new Error(`Error fetching transaction details: ${err.message}`);
    }
  } else {
    throw new Error("Method Not Allowed");
  }
});
