<template>
  <div class="flex justify-between mb-4 md:mb-8 items-center">
    <div class="flex justify-center w-full">
      <span
        class="inline-block uppercase py-1 px-3 text-xs font-semibold text-black bg-gray-50 rounded-full"
        >{{ $t("days-tab") }}
      </span>
    </div>
    <span @click="emitCloseUp">
      <XCircleIcon class="h-8 w-8 text-black"
    /></span>
  </div>
  <div class="flex flex-wrap justify-center">
    <div
      v-for="bike in getCurrentBikeOptions()"
      :key="bike.id"
      class="w-full md:w-1/2 md:px-4 xl:px-10 md:mb-10 mb-4"
    >
      <div
        class="max-w-full mx-auto h-full py-4 md:py-8 bg-white border border-gray-200 rounded-lg"
      >
        <div class="mx-auto text-center">
          <h5 class="text-2xl font-montserrat text-gray-900">
            {{ bike.timeFrame }}
          </h5>
          <p class="md:h-16 text-black md:p-4 font-monserrat mb-2 md:mb-8">
            {{ bike.name }}
          </p>
          <button
            @click="selectBike(bike)"
            class="bg-black text-white w-4/6 rounded-lg p-2 md:p-3"
          >
            {{ bike.timeFrame }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="">
    <div class="w-full">
      <button
        class="w-full border text-black rounded-md px-4 py-2 hover:bg-black hover:text-white"
        @click="prevStep"
      >
        {{ $t("previous-cta") }}
      </button>
    </div>

    <!-- <button
      class="bg-black text-white rounded-md px-4 py-2 hover:border hover:text-black hover:bg-transparent"
      @click="nextStep"
    >
      Next
    </button> -->
  </div>
</template>

<script setup>
import { XCircleIcon } from "@heroicons/vue/24/solid";
// Props
let props = defineProps({
  formSteps: {
    type: Object,
    required: true,
  },
});

let emits = defineEmits(["currentBikeEmit", "prevStep", "closeUp", "nextStep"]);

const selectBike = (bike) => {
  emits("currentBikeEmit", bike);
};
const getCurrentBikeOptions = () => {
  return props.formSteps.bikeOptions[props.formSteps.selectedCity];
};
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
