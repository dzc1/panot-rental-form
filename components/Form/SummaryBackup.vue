<template>
  <div class="overflow-y-auto">
    <div class="text-center">
      <span
        class="inline-block py-1 px-3 mb-4 text-xs font-semibold text-black bg-gray-50 rounded-full"
        >Summary</span
      >
      <h2 class="font-monserrat text-2xl font-semibold text-gray-800">
        Form Summary
      </h2>
      <div class="py-2">
        <p class="text-sm font-monserrat text-gray-900 mb-2">
          City:
          <span class="font-semibold">{{ formSteps.selectedCity }}</span>
        </p>
        <p class="text-sm font-monserrat text-gray-900 mb-2">
          Days:
          <span class="font-semibold">{{ formSteps.selectedBike.name }}</span>
        </p>
        <p class="text-sm font-monserrat text-gray-900 mb-2">
          Name: <span class="font-semibold">{{ formSteps.fullName }}</span>
        </p>
        <p class="text-sm font-monserrat text-gray-900 mb-2">
          Email: <span class="font-semibold">{{ formSteps.email }}</span>
        </p>
        <p class="text-sm font-monserrat text-gray-900 mb-2">
          Passport or ID Number:
          <span class="font-semibold">{{ formSteps.passportNumber }}</span>
        </p>
        <p class="text-sm font-monserrat text-gray-900 mb-2">
          Phone Number:
          <span class="font-semibold">{{ formSteps.phoneContact }}</span>
        </p>
        <p class="text-sm font-monserrat text-gray-900 mb-2">
          Address:
          <span class="font-semibold"
            >{{ formSteps.address.address.address }},
            {{ formSteps.address.address.city }},
            {{ formSteps.address.address.state }},
            {{ formSteps.address.address.country }},
            {{ formSteps.address.address.postalCode }}.
          </span>
        </p>
      </div>
      <div class="text-left">
        <p class="text-sm font-semibold text-gray-900 mb-5">I Declare:</p>
        <p class="text-md font-montserrat font-light mb-2">
          I. That I take responsibility for the eBike PANOT and the accompanying
          accessories (basket and mobile holder) from the moment of delivery
          until its return.
        </p>
        <p class="text-md font-montserrat font-light mb-2">
          II. That I commit to using it with due diligence, in accordance with
          its intended characteristics and use (urban) and complying with
          traffic regulations, being obligated to compensate PANOT, the
          establishment, and/or third parties who provided the eBike to the
          establishment for any damages that may arise from my failure to comply
          with such obligations.
        </p>
        <p class="text-md font-montserrat font-light mb-2">
          III. - That I have confirmed the condition of the eBike prior to
          signing this document and that it is in perfect aesthetic and
          technical condition, having verified its proper functioning.
        </p>
        <p class="text-md font-montserrat font-light mb-2">
          IV. That I declare that I am aware that the eBike can only be used by
          the person designated for that purpose by the establishment.
        </p>
        <p class="text-md font-montserrat font-light mb-2">
          V. - That I declare that
          <b class="font-bold"
            >I am aware that the risk associated with the use of the eBike is
            not covered by any insurance, and I will be solely responsible for
            any damages or injuries that I may suffer or cause to third parties
            during its use, releasing the establishment, PANOT, and third
            parties who provided the eBike to the establishment from any
            liability in this regard.</b
          >
        </p>
        <p class="text-md font-montserrat font-light mb-2">
          VI. - That I declare that I am aware of the obligation to return the
          eBike (and accessories) in the same condition in which it was
          delivered to me, and that damages, loss, or theft of the eBike are not
          covered by any insurance. I commit to assuming the costs of its repair
          in case of return in poor condition, and the full price of the bike in
          case of return in unserviceable conditions or non-return.
        </p>
        <p class="text-md font-montserrat font-light mb-2">
          VII. - That I declare that I am aware that the eBike is equipped with
          a GPS mobile system, which I authorize so that PANOT can locate it in
          case of loss or theft.
        </p>
      </div>
      <button
        @click="signatureDisplay = !signatureDisplay"
        class="bg-black text-white rounded-md px-4 py-2 hover:border hover:text-black hover:bg-transparent mb-8"
      >
        SIGN
      </button>
    </div>
    <div>
      <!-- <p>Signature</p> -->
      <vue3-signature
        v-if="signatureDisplay"
        class="border"
        ref="signature"
        :width="300"
        :height="1000"
        :penColor="penColor"
      ></vue3-signature>
      <div class="flex flex-col py-8">
        <button
          class="border text-black rounded-md px-4 py-2 hover:border hover:text-white hover:bg-black mb-4"
          @click="clearSignature"
        >
          Clear
        </button>
        <button
          class="bg-black text-white rounded-md px-4 py-2 hover:border hover:text-black hover:bg-transparent mb-8"
          @click="submitForm"
        >
          Submit Form
        </button>
      </div>
    </div>
    <!-- Hidden PDF Elements -->
    <!-- <div>
          <div id="pdfSection" class="p-4">
            <p>Rental Copy</p>
            <ul>
              <li class="font-bold">
                City:
                <span class="font-light">{{ formSteps.selectedCity }}</span>
              </li>
              <li class="font-bold">
                Days:
                <span class="font-light">{{
                  formSteps.selectedBike.name
                }}</span>
              </li>
              <li class="font-bold">
                Name:
                <span class="font-light">
                  {{ formSteps.fullName }}
                </span>
              </li>
              <li class="font-bold">
                Email:
                <span class="font-light">
                  {{ formSteps.email }}
                </span>
              </li>
              <li class="font-bold">
                Passport or ID Number:
                <span class="font-light">
                  {{ formSteps.passportNumber }}
                </span>
              </li>
              <li class="font-bold">
                Phone Number:
                <span class="font-light">
                  {{ formSteps.phoneContact }}
                </span>
              </li>
              <li class="font-bold">
                Address:
                <span class="font-light">
                  {{ formSteps.address.address }}, {{ formSteps.address.city }},
                  {{ formSteps.address.state }},
                  {{ formSteps.address.country }},
                  {{ formSteps.address.postalCode }}
                </span>
              </li>
            </ul>
            <ul>
              <li class="text-center">I Declare:</li>
              <li>
                I. That I take responsibility for the eBike PANOT and the
                accompanying <br />
                accessories (basket and mobile holder) <br />
                from the moment of delivery until its return.
              </li>
              <li>
                II. That I commit to using it with due diligence, in accordance
                <br />
                with its intended characteristics and use (urban) and complying
                <br />
                with traffic regulations, being obligated to compensate PANOT,
                the establishment, and/or third parties <br />
                who provided the eBike to the establishment for any damages that
                <br />
                may arise from my failure to comply with such obligations.
              </li>
              <li>
                III. - That I have confirmed the condition of the eBike prior to
                <br />
                signing this document and that it is in perfect aesthetic and
                technical condition, <br />
                having verified its proper functioning.
              </li>
              <li>
                IV. That I declare that I am aware that the eBike <br />
                can only be used by the person <br />
                designated for that purpose by the establishment.
              </li>
              <li>
                V. - That I declare that I am aware that the risk associated
                with the use of the eBike <br />
                is not covered by any insurance, and I will be solely
                responsible <br />
                for any damages or injuries that I may suffer or cause to third
                parties <br />
                during its use, <br />
                releasing the establishment, PANOT, and third parties who
                provided the eBike to the establishment <br />
                from any liability in this regard.
              </li>
              <li>
                VI. - That I declare that I am aware of the obligation to return
                the eBike (and accessories) <br />
                in the same condition in which it was delivered to me, and that
                damages, loss, or theft <br />
                of the eBike are not covered by any insurance. <br />
                I commit to assuming the costs of its repair in case of return
                in poor condition, <br />
                and the full price of the bike in case of return in
                unserviceable conditions or non-return.
              </li>
              <li>
                VII. - That I declare that I am aware that the eBike is equipped
                <br />
                with a GPS mobile system, which I authorize so that PANOT can
                locate it in case of loss or theft.
              </li>
              <li>{{ formSteps.selectedCity }}, on the date of {{ date }}</li>
            </ul>
          </div>
        </div> -->
  </div>
</template>

<script setup>
import { exportToPDF } from "#imports";
import Vue3Signature from "vue3-signature";
import { XCircleIcon } from "@heroicons/vue/24/solid";
import { ref, reactive } from "vue";

let emits = defineEmits(["signatureCaptured"]);

defineProps({
  formSteps: {
    type: Object,
    required: true,
  },
});

//PDF LOGIC
const penColor = ref("#000000");
const signature = ref(null);

// Clear Signature Prop Values
const clearSignature = () => {
  signature.value.clear();
};

// Emit signature
const emitSignature = () => {
  const signatureData = signature.value.getData();
  emits("signatureCaptured", signatureData);
};

// Display Signature Box
let signatureDisplay = ref(false);

// PDF Logic
const pdfHide = ref(false);
let pdfSection = ref(null);
</script>

<style scoped></style>
