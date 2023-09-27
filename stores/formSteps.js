import { ref, reactive, computed, onUpdated } from "vue";
import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";

export const useFormStepsStore = defineStore("formSteps", () => {
  const { t } = useI18n(); // use as global scope
  let formSteps = reactive({
    step: 2,
    selectedCity: "",
    selectedBike: null,
    bikeOptions: {
      Sotogrande: [
        {
          id: 1,
          name: t("sotogrande[0].name"),
          timeFrame: t("sotogrande[0].timeFrame"),
          paymentLink: "https://pay.panotmobility.com/b/6oEg1i8GOfL5cQE9B3",
          stripeId: "price_1NQTAvI5XtUC28eOyWXp4uZi",
        },
        {
          id: 2,
          name: t("sotogrande[1].name"),
          timeFrame: t("sotogrande[1].timeFrame"),
          paymentLink: "https://pay.panotmobility.com/b/bIY8yQ5uC7ezaIw6oQ",
          stripeId: "price_1NukDdI5XtUC28eObaCH474y",
        },
        {
          id: 3,
          name: t("sotogrande[2].name"),
          timeFrame: t("sotogrande[2].timeFrame"),
          paymentLink: "https://pay.panotmobility.com/b/bIY16o0aifL517WaF5",
          stripeId: "price_1NukDdI5XtUC28eObaCH474y",
        },
        {
          id: 4,
          name: t("sotogrande[3].name"),
          timeFrame: t("sotogrande[3].timeFrame"),
          paymentLink: "https://pay.panotmobility.com/b/dR67uM6yGeH1aIwdRg",
          stripeId: "price_1NukHgI5XtUC28eOpnnMkxuS",
        },
      ],
      costaBlanca: [
        {
          id: 1,
          name: t("costaBlanca[0].name"),
          timeFrame: t("costaBlanca[0].timeFrame"),
          paymentLink: "https://pay.panotmobility.com/b/6oEg1i8GOfL5cQE9B3",
          stripeId: "price_1Nuw8mI5XtUC28eOEj5rsi9A",
        },
        {
          id: 2,
          name: t("costaBlanca[1].name"),
          timeFrame: t("costaBlanca[1].timeFrame"),
          paymentLink: "https://pay.panotmobility.com/b/bIY8yQ5uC7ezaIw6oQ",
          stripeId: "price_1NuwAZI5XtUC28eOSDLp3rSL",
        },
        {
          id: 3,
          name: t("costaBlanca[2].name"),
          timeFrame: t("costaBlanca[2].timeFrame"),
          paymentLin: "https://pay.panotmobility.com/b/bIY16o0aifL517WaF5",
          stripeId: "price_1NuwBJI5XtUC28eOsGGJsU3d",
        },
      ],
      Fuerteventura: [
        {
          id: 1,
          name: t("fuerteventura[0].name"),
          timeFrame: t("fuerteventura[0].timeFrame"),
          paymentLink: "https://pay.panotmobility.com/b/28o9CU8GO0Qb17W6oK",
          stripeId: "prod_OCswC7kdEhvFDM",
        },
        {
          id: 2,
          name: t("fuerteventura[1].name"),
          timeFrame: t("fuerteventura[1].timeFrame"),
          paymentLink: "https://pay.panotmobility.com/b/8wM3ew0aicyTeYMcN9",
          stripeId: "prod_OCswC7kdEhvFDM",
        },
        {
          id: 3,
          name: t("fuerteventura[2].name"),
          timeFrame: t("fuerteventura[2].timeFrame"),
          paymentLink: "https://pay.panotmobility.com/b/eVa6qI0ai0QbdUI5kI",
          stripeId: "prod_OCswC7kdEhvFDM",
        },
        {
          id: 4,
          name: t("fuerteventura[3].name"),
          timeFrame: t("fuerteventura[3].timeFrame"),
          paymentLink: "https://pay.panotmobility.com/b/aEUdTa8GOdCX4k87sR",
          stripeId: "prod_OCswC7kdEhvFDM",
        },
      ],
    },
    fullName: "",
    address: {
      address: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
    passportNumber: "",
    email: "",
    signature: null,
    phoneContact: "",
  });

  const nextStep = () => {
    console.log("Next Step");
    formSteps.step++;
  };

  const prevStep = () => {
    formSteps.step--;
  };

  const selectCity = (city) => {
    formSteps.selectedCity = city;
    nextStep();
  };
  return { formSteps, nextStep, prevStep, selectCity };
});
