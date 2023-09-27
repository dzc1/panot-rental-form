<template>
  <div class="flex justify-between mb-4 md:mb-8 items-center">
    <div class="flex justify-center w-full">
      <span
        class="inline-block uppercase py-1 px-3 text-xs font-semibold text-black bg-gray-50 rounded-full"
      >
        {{ $t("comp-location-informational-tab") }}</span
      >
    </div>
    <span @click="emitCloseUp">
      <XCircleIcon class="h-8 w-8 text-black"
    /></span>
  </div>
  <div class="flex flex-wrap justify-center -mx-4">
    <div class="w-full md:w-1/2 lg:w-auto px-4 xl:px-10 mb-4 md:mb-8">
      <div
        class="max-w-sm mx-auto h-full py-6 px-6 bg-white border border-gray-200 rounded-lg"
      >
        <div class="max-w-2xs mx-auto text-center">
          <h5 class="text-2xl font-montserrat text-gray-900">
            {{ $t("comp-location-city-sotogrande") }}
          </h5>
          <p class="text-black font-monserrat h-3/6">
            {{ $t("comp-location-city-sotogrande-info") }}
          </p>
          <button
            @click="selectCity('Sotogrande')"
            class="bg-black text-white w-4/6 rounded-lg p-3 mt-6"
          >
            Sotogrande
          </button>
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/2 lg:w-auto px-4 xl:px-10 mb-4 md:mb-8">
      <div
        class="max-w-sm mx-auto h-full py-6 px-6 bg-white border border-gray-200 rounded-lg"
      >
        <div class="max-w-2xs mx-auto text-center">
          <h5 class="text-2xl font-montserrat text-gray-900 mb-3">
            {{ $t("comp-location-city-fuerteventura") }}
          </h5>
          <p class="text-black font-monserrat h-3/6">
            {{ $t("comp-location-city-fuerteventura-info") }}
          </p>
          <button
            @click="selectCity('Fuerteventura')"
            class="bg-black text-white w-4/6 rounded-lg p-3 mt-6"
          >
            Fuerteventura
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { XCircleIcon } from "@heroicons/vue/24/solid";
let emits = defineEmits(["emitChildCity", "emitChildClose"]);

const selectCity = (city) => {
  emits("emitChildCity", city);
};

let emitCloseUp = () => {
  emits("emitChildClose");
};
</script>

<style scoped></style>
