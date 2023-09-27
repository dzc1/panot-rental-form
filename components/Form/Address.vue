<template>
  <div class="flex justify-between mb-4 md:mb-8 items-center">
    <div class="flex justify-center w-full">
      <span
        class="inline-block uppercase py-1 px-3 text-xs font-semibold text-black bg-gray-50 rounded-full"
        >{{ $t("address-tab") }}</span
      >
    </div>
    <span @click="emitCloseUp">
      <XCircleIcon class="h-8 w-8 text-black"
    /></span>
  </div>

  <div class="mb-4">
    <label
      class="block mb-1.5 text-sm text-gray-900 font-semibold"
      for="address"
      >{{ $t("addressForm.address") }}</label
    >
    <input
      class="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-black focus:outline-black rounded-lg"
      v-model="formSteps.address.address"
      type="text"
      id="address"
      :placeholder="
        addressProp ? addressProp.address : formSteps.address.address
      "
    />
  </div>
  <div class="mb-4">
    <label class="block mb-1.5 text-sm text-gray-900 font-semibold" for="city"
      >{{ $t("addressForm.city") }}
    </label>
    <input
      class="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-black focus:outline-black rounded-lg"
      v-model="formSteps.address.city"
      type="text"
      :placeholder="addressProp ? addressProp.city : formSteps.address.city"
      id="city"
    />
  </div>
  <div class="mb-4">
    <label
      class="block mb-1.5 text-sm text-gray-900 font-semibold"
      for="state"
      >{{ $t("addressForm.state") }}</label
    >
    <input
      class="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-black focus:outline-black rounded-lg"
      v-model="formSteps.address.state"
      type="text"
      :placeholder="addressProp ? addressProp.state : formSteps.address.state"
      id="state"
    />
  </div>
  <div class="mb-4">
    <label
      class="block mb-1.5 text-sm text-gray-900 font-semibold"
      for="country"
    >
      {{ $t("addressForm.country") }}</label
    >
    <input
      class="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-black focus:outline-black rounded-lg"
      v-model="formSteps.address.country"
      type="text"
      :placeholder="
        addressProp ? addressProp.country : formSteps.address.country
      "
      id="country"
    />
  </div>
  <div class="mb-4">
    <label class="block mb-1.5 text-sm text-gray-900 font-semibold" for="zip">
      {{ $t("addressForm.zipCode") }}</label
    >
    <input
      class="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-black focus:outline-black rounded-lg"
      v-model="formSteps.address.postalCode"
      type="text"
      :placeholder="
        addressProp ? addressProp.postalCode : formSteps.address.postalCode
      "
      id="zip"
    />
  </div>
  <div class="">
    <button
      v-if="addressProp"
      class="w-full rounded-md px-4 py-2 mb-4 bg-black text-white"
      @click="nextStep"
    >
      {{ $t("next-cta") }}
    </button>
    <button
      v-else
      class="w-full rounded-md px-4 py-2 mb-4"
      :class="
        isFullNameFilled ? 'bg-gray-200 text-gray-300' : 'bg-black text-white'
      "
      @click="nextStep"
      :disabled="isFullNameFilled"
    >
      {{ $t("next-cta") }}
    </button>
    <button
      class="w-full border text-black rounded-md px-4 py-2 hover:bg-black hover:text-white"
      @click="prevStep"
    >
      {{ $t("previous-cta") }}
    </button>
  </div>
</template>

<script setup>
import { XCircleIcon } from "@heroicons/vue/24/solid";
let emits = defineEmits([
  "prevStep",
  "closeUp",
  "nextStep",
  "update:address",
  "",
]);
defineProps({
  addressProp: {
    type: String,
  },
});
const formSteps = reactive({
  address: {
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  },
});

const isFullNameFilled = computed(() => {
  return formSteps.address.postalCode === "";
});

watch(formSteps, (newAddress) => {
  emits("update:address", newAddress);
});

const prevStep = () => {
  emits("prevStep");
};

const emitCloseUp = () => {
  emits("closeUp");
};

const nextStep = () => {
  emits("nextStep");
};
</script>

<style scoped></style>
