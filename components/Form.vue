<template>
  <div>
    <template v-if="formSteps.step === 1">
      <div class="form-step fade-in">
        <button @click="nextStep">Start Form</button>
      </div>
    </template>
    <!-- Step 2 -->
    <template v-else-if="formSteps.step === 2">
      <div class="form-step fade-in">
        <Location @emitChildCity="selectCity" @emitChildClose="emitCloseUp" />
      </div>
    </template>
    <!-- Step 3 -->
    <template v-else-if="formSteps.step === 3">
      <div class="form-step fade-in">
        <Days
          :formSteps="formSteps"
          @currentBikeEmit="selectBike"
          @prevStep="prevStep"
          @closeUp="emitCloseUp"
          @nextStep="nextStep"
        />
      </div>
    </template>
    <!-- Step 4 -->
    <template v-else-if="formSteps.step === 4">
      <div class="form-step fade-in">
        <Name
          v-model:fullName="formSteps.fullName"
          @prevStep="prevStep"
          @closeUp="emitCloseUp"
          @nextStep="nextStep"
          :fullnameProp="formSteps.fullName"
        />
      </div>
    </template>
    <!-- Step 5 -->
    <template v-else-if="formSteps.step === 5">
      <div class="form-step fade-in">
        <Address
          :addressProp="formSteps.address.address"
          v-model:address="formSteps.address"
          @prevStep="prevStep"
          @closeUp="emitCloseUp"
          @nextStep="nextStep"
        />
      </div>
    </template>
    <!-- Step 6 -->
    <template v-else-if="formSteps.step === 6">
      <div class="form-step fade-in">
        <Passport
          v-model:passportNumber="formSteps.passportNumber"
          @prevStep="prevStep"
          @closeUp="emitCloseUp"
          @nextStep="nextStep"
          :passportProp="formSteps.passportNumber"
        />
      </div>
    </template>
    <!-- Step 7 -->
    <template v-else-if="formSteps.step === 7">
      <div class="form-step fade-in">
        <Phone
          v-model:phoneContact="formSteps.phoneContact"
          @prevStep="prevStep"
          @closeUp="emitCloseUp"
          @nextStep="nextStep"
          :phoneProp="formSteps.phoneContact"
        />
      </div>
    </template>
    <!-- Step 8 -->
    <template v-else-if="formSteps.step === 8">
      <div class="form-step fade-in">
        <Email
          v-model:email="formSteps.email"
          @prevStep="prevStep"
          @closeUp="emitCloseUp"
          @nextStep="nextStep"
          :emailProp="formSteps.email"
        />
      </div>
    </template>
    <!-- Step 9 -->
    <template v-else-if="formSteps.step === 9">
      <div class="form-step fade-in">
        <Summary
          :formSteps="formSteps"
          @signatureCaptured="submitForm"
          @closeUp="emitCloseUp"
          @payButton="handleCheckoutTwo"
        />
        {{ formSteps.selectedBike }}
      </div>
    </template>
  </div>
</template>

<script setup>
//import { StripeCheckout } from "@vue-stripe/vue-stripe";
import { ref, reactive } from "vue";
import { exportToPDF } from "#imports";
import { jsPDF } from "jspdf";
import Location from "../components/Form/Location.vue";
import Days from "../components/Form/Days.vue";
import Name from "../components/Form/Name.vue";
import Address from "../components/Form/Address.vue";
import Passport from "../components/Form/Passport.vue";
import Phone from "../components/Form/Phone.vue";
import Email from "../components/Form/Email.vue";
import Summary from "../components/Form/Summary.vue";
import { useI18n } from "vue-i18n";

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
  fullName: "Diego Zito",
  address: {
    address: "2723 Center Court Dr",
    city: "Weston",
    state: "FL",
    country: "USA",
    postalCode: "08013",
  },
  passportNumber: "Y4795940V",
  email: "diegozito.m@gmail.com",
  signature: null,
  phoneContact: "+34699885435",
});

const handleCheckoutTwo = async () => {
  const res = await $fetch("/api/cart", {
    method: "POST",
    body: {
      products: {
        default_price: formSteps.selectedBike.stripeId,
        quantity: 1,
      },
    },
  });
  window.location = res.url;
  console.log(res);
};

const nextStep = () => {
  formSteps.step++;
};

const prevStep = () => {
  formSteps.step--;
};

const selectCity = (city) => {
  formSteps.selectedCity = city;
  nextStep();
};

const selectBike = (bike) => {
  formSteps.selectedBike = bike;
  nextStep();
};

const emits = defineEmits("closeFunction");

let emitCloseUp = () => {
  const stepNumber = 9;
  emits("closeFunction", stepNumber);
};

let date = ref(new Date().toISOString().slice(0, 10));

const submitForm = async (signature) => {
  const formStepsData = { ...formSteps };
  let formSignature = (formSteps.signature = signature);

  // remove white space
  function removeWhiteSpace(str) {
    return str.replace(/\s/g, "-");
  }

  // Create a new instance of jsPDF
  const doc = new jsPDF();

  // Set the font size and type
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  // Add content to the document
  doc.text("Panot Mobility Rental Form", 105, 10, null, null, "center");

  const marginLeft = 20;
  const marginTop = 20;
  const pageWidth = doc.internal.pageSize.width;
  const marginRight = 20; // Set a right margin of 20 units
  const maxLineWidth = pageWidth - marginLeft - marginRight;
  const textContent = `
  I, ${formStepsData.fullName}, of legal age, residing at ${formStepsData.address.address.address}, ${formStepsData.address.address.city} ${formStepsData.address.address.state}, ${formStepsData.address.address.country} ${formStepsData.address.address.postalCode}.
  With ID/Passport Number ${formStepsData.passportNumber}, contact telephone number ${formStepsData.phoneContact} and email address ${formStepsData.email}.

  I Declare

  I. That I take responsibility for the eBike PANOT and the accompanying accessories (basket and mobile holder) from the moment of delivery until its return.

  II. That I commit to using it with due diligence, in accordance with its intended characteristics and use (urban) and complying with traffic regulations, being obligated to compensate PANOT, the establishment, and/or third parties who provided the eBike to the establishment for any damages that may arise from my failure to comply with such obligations.

  III. - That I have confirmed the condition of the eBike prior to signing this document and that it is in perfect aesthetic and technical condition, having verified its proper functioning.

  IV. That I declare that I am aware that the eBike can only be used by the person designated for that purpose by the establishment.

  V. - That I declare that I am aware that the risk associated with the use of the eBike is not covered by any insurance, and I will be solely responsible for any damages or injuries that I may suffer or cause to third parties during its use, releasing the establishment, PANOT, and third parties who provided the eBike to the establishment from any liability in this regard.

  VI. - That I declare that I am aware of the obligation to return the eBike (and accessories) in the same condition in which it was delivered to me, and that damages, loss, or theft of the eBike are not covered by any insurance. I commit to assuming the costs of its repair in case of return in poor condition, and the full price of the bike in case of return in unserviceable conditions or non-return.

  VII. - That I declare that I am aware that the eBike is equipped with a GPS mobile system, which I authorize so that PANOT can locate it in case of loss or theft.
  `;
  const splitText = doc.splitTextToSize(textContent, maxLineWidth);

  // Add the split text to the document
  doc.text(splitText, marginLeft, marginTop);

  doc.addImage(formSignature, "png", 20, 200, 100, 50);
  doc.text(
    `Signed by ${formStepsData.fullName} on ${formStepsData.selectedCity}, Spain on the date of ${date.value}.`,
    20,
    250
  );

  // Save the PDF document
  doc.save(
    `panot-rental-form-${removeWhiteSpace(formStepsData.fullName)}${
      date.value
    }.pdf`
  );
};
</script>

<style scoped>
.form-step {
  opacity: 0;
}

.fade-in {
  animation: fadeIn 0.5s ease-in-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
