<template>
  <div class="flex justify-between mb-4 md:mb-8 items-center">
    <div class="flex justify-center w-full">
      <span
        class="inline-block uppercase py-1 px-3 text-xs font-semibold text-black bg-gray-50 rounded-full"
      >
        {{ $t("comp-phoneNumber.tab") }}</span
      >
    </div>
    <span @click="emitCloseUp">
      <XCircleIcon class="h-8 w-8 text-black"
    /></span>
  </div>

  <div class="mb-6">
    <label
      class="block mb-1.5 text-sm text-gray-900 font-semibold"
      for="phone"
      >{{ $t("comp-phoneNumber.formLabel") }}</label
    >
    <input
      class="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-black focus:outline-black rounded-lg"
      v-model="formSteps.phoneContact"
      type="tel"
      :placeholder="phoneProp ? phoneProp : formSteps.phoneContact"
      id="phone"
    />
  </div>
  <div class="">
    <button
      v-if="phoneProp"
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
  "update:phoneContact",
]);
defineProps({
  phoneProp: {
    type: String,
  },
});

const formSteps = reactive({
  phoneContact: "",
});

const isFullNameFilled = computed(() => {
  return formSteps.phoneContact === "";
});

watch(formSteps, (newFormSteps) => {
  emits("update:phoneContact", newFormSteps.phoneContact);
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
