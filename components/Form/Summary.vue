<template>
  <div class="overflow-y-auto">
    <div class="flex justify-between mb-4 items-center">
      <div class="flex justify-center w-full">
        <span
          class="inline-block uppercase py-1 px-3 text-xs font-semibold text-black bg-gray-50 rounded-full"
        >
          {{ $t("comp-summary.tab") }}</span
        >
      </div>
      <span @click="emitCloseUp">
        <XCircleIcon class="h-8 w-8 text-black"
      /></span>
    </div>
    <div class="text-center">
      <h2 class="font-monserrat text-2xl font-semibold text-gray-800">
        {{ $t("comp-summary.formLabel") }}
      </h2>
      <div class="text-left py-2">
        <p class="font-monserrat text-gray-900 mb-2">
          {{ $t("comp-summary.city") }}
          <span class="font-semibold block">{{ formSteps.selectedCity }}</span>
        </p>
        <p class="font-monserrat text-gray-900 mb-2">
          {{ $t("comp-summary.days") }}
          <span class="font-semibold block">{{
            formSteps.selectedBike.name
          }}</span>
        </p>
        <p class="font-monserrat text-gray-900 mb-2">
          {{ $t("comp-summary.name") }}
          <span class="font-semibold block">{{ formSteps.fullName }}</span>
        </p>
        <p class="font-monserrat text-gray-900 mb-2">
          {{ $t("comp-summary.email") }}
          <span class="font-semibold block">{{ formSteps.email }}</span>
        </p>
        <p class="font-monserrat text-gray-900 mb-2">
          {{ $t("comp-summary.id") }}
          <span class="font-semibold block">{{
            formSteps.passportNumber
          }}</span>
        </p>
        <p class="font-monserrat text-gray-900 mb-2">
          {{ $t("comp-summary.phone") }}
          <span class="font-semibold block">{{ formSteps.phoneContact }}</span>
        </p>
        <p class="font-monserrat text-gray-900 mb-2">
          {{ $t("comp-summary.address") }}
          <span class="font-semibold block"
            >{{ formSteps.address.address.address }},
            {{ formSteps.address.address.city }},
            {{ formSteps.address.address.state }},
            {{ formSteps.address.address.country }},
            {{ formSteps.address.address.postalCode }}.
          </span>
        </p>
      </div>
      <div class="text-left">
        <p class="font-semibold text-gray-900">
          {{ $t("comp-summary.statement") }}
        </p>
        <p class="text-sm font-montserrat font-light mb-2">
          {{ $t("comp-summary.statementOne") }}
        </p>
        <p class="text-sm font-montserrat font-light mb-2">
          {{ $t("comp-summary.statementTwo") }}
        </p>
        <p class="text-sm font-montserrat font-light mb-2">
          {{ $t("comp-summary.statementThree") }}
        </p>
        <p class="text-sm font-montserrat font-light mb-2">
          {{ $t("comp-summary.statementFour") }}
        </p>
        <p class="text-sm font-montserrat font-light mb-2">
          {{ $t("comp-summary.statementFiveA") }}
          <b class="font-bold">{{ $t("comp-summary.statementFiveB") }}</b>
        </p>
        <p class="text-sm font-montserrat font-light mb-2">
          {{ $t("comp-summary.statementSix") }}
        </p>
        <p class="text-sm font-montserrat font-light mb-2">
          {{ $t("comp-summary.statementSeven") }}
        </p>
      </div>
      <!-- <button
        v-show="!signatureDisplay"
        @click="signatureDisplay = !signatureDisplay"
        class="w-full bg-black text-white rounded-md px-4 py-2 hover:border hover:text-black hover:bg-transparent my-4"
      >
        {{ $t("comp-summary.sign") }}
      </button> -->
      <button
        class="bg-black text-white rounded-md px-4 py-2 hover:text-black hover:bg-transparent mb-8"
        @click="pay"
        :disabled="buttonHide"
      >
        {{ $t("comp-summary.pay") }}
      </button>
    </div>
    <div>
      <!-- <p>Signature</p> -->
      <div v-if="signatureDisplay">
        <vue3-signature
          class="border"
          ref="signature"
          :w="'100%'"
          :h="'250px'"
          :penColor="penColor"
        ></vue3-signature>
        <div class="flex flex-col py-8">
          <button
            class="border text-black rounded-md px-4 py-2 hover:border hover:text-white hover:bg-black mb-4"
            @click="clearSignature"
          >
            {{ $t("comp-summary.clear") }}
          </button>
          <button
            class="rounded-md px-4 py-2 mb-4"
            @click="emitSignature"
            :class="
              buttonHide
                ? 'bg-gray-200 text-gray-300'
                : 'bg-black text-white  hover:bg-transparent hover:text-black cursor-pointer '
            "
          >
            {{ $t("comp-summary.download") }}
          </button>
          <button
            class="bg-black text-white rounded-md px-4 py-2 hover:text-black hover:bg-transparent mb-8"
            @click="pay"
            :disabled="buttonHide"
          >
            {{ $t("comp-summary.pay") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Vue3Signature from "vue3-signature";
import { ref, reactive } from "vue";
import { XCircleIcon } from "@heroicons/vue/24/solid";

let emits = defineEmits(["signatureCaptured", "payButton", "closeUp"]);

defineProps({
  formSteps: {
    type: Object,
    required: true,
  },
});

//PDF LOGIC
const penColor = ref("#000000");

// Display Signature Box
let signatureDisplay = ref(false);

const signature = ref(null);
// let test = ref(false);

// Watch the signature variable for changes
// watch(signature, (newValue) => {
//   if (newValue) {
//     // Signature display has changed, do something...
//     // For example, enable buttons or perform any necessary logic.
//     // You can access the signature component using `signature.value`.
//     alert("hello");
//   }
// });

// Clear Signature Prop Values
const clearSignature = () => {
  signature.value.clear();
};
// Emit signature
const emitSignature = () => {
  const signatureData = signature.value.save("signatue/png");
  emits("signatureCaptured", signatureData);
};

const pay = () => {
  emits("payButton");
};

const emitCloseUp = () => {
  console.log("Testt");
  emits("closeUp");
};
</script>

<style scoped></style>
