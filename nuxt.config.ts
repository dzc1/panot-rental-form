// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@sidebase/nuxt-pdf",
    "@pinia/nuxt",
  ],
  runtimeConfig: {
    stripeSecret: process.env.STRIPE_SK,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    productionSuccessURL: process.env.PRODUCTION_URL,
    developmentSuccessURL: process.env.DEVELOPMENT_URL,
    public: {
      appUrl: process.env.APP_URL,
      stripePk: process.env.STRIPE_PK,
    },
  },
  googleFonts: {
    families: {
      Monserrat: [100, 300, 400, 700],
    },
  },
});
