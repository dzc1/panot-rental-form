<template>
  <div class="flex justify-between mb-4 md:mb-8 items-center">
    <div class="flex justify-center w-full">
      <span
        class="inline-block uppercase py-1 px-3 text-xs font-semibold text-black bg-gray-50 rounded-full"
      >
        {{ $t("name-tab") }}</span
      >
    </div>
    <span @click="emitCloseUp">
      <XCircleIcon class="h-8 w-8 text-black" />
    </span>
  </div>

  <div class="mb-6">
    <div>
      <label
        class="block mb-1.5 text-sm text-gray-900 font-semibold"
        for="name"
        >{{ $t("name-name-label") }}</label
      >
      <input
        class="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-black focus:outline-black rounded-lg"
        v-model="formSteps.fullName"
        type="text"
        :pattern="getFullNameRegexPattern()"
        id="name"
        :placeholder="fullnameProp ? fullnameProp : 'Default Name'"
      />
      <p class="text-red-500 text-sm mt-1" v-if="isFullNameInvalid">
        {{ fullNameErrorMessage }}
      </p>
    </div>
    <div class="mt-8">
      <button
        v-if="fullnameProp"
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
        :disabled="isFullNameFilled || isFullNameInvalid"
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
  </div>
</template>

<script setup>
import { XCircleIcon } from "@heroicons/vue/24/solid";
defineProps({
  fullnameProp: {
    type: String,
  },
});

let emits = defineEmits(["prevStep", "closeUp", "nextStep", "update:fullName"]);
const formSteps = reactive({
  fullName: "",
});

watch(formSteps, (newFormSteps) => {
  emits("update:fullName", newFormSteps.fullName);
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

const isFullNameFilled = computed(() => {
  return formSteps.fullName === "";
});

const isFullNameInvalid = computed(() => {
  const fullNamePattern = getFullNameRegexPattern();
  return !fullNamePattern.test(formSteps.fullName);
});
const fullNameErrorMessage = computed(() => {
  const fullNamePattern = getFullNameRegexPattern();
  if (fullNamePattern.source === ".*") {
    return ""; // No error message for empty input
  } else {
    return "Invalid name format"; // Error message for invalid input
  }
});

const getFullNameRegexPattern = () => {
  const fullName = formSteps.fullName.trim(); // Remove leading/trailing whitespace

  if (fullName === "") {
    // Empty input, any value is allowed
    return new RegExp(".*");
  } else if (
    fullName.length < 5 || // Exclude names shorter than 4 characters
    fullName === fullName.toUpperCase() || // Exclude all uppercase names
    /([a-zA-Z])\1{2,}/.test(fullName) // || // Exclude repetitive sequences of the same letter (e.g., "aaa")
    // !/^\d{4}[a-zA-Z]+$/.test(fullName) // Check if the first 4 characters are numbers followed by letters
  ) {
    return new RegExp("(?!.*)."); // Negative lookahead to ensure no matches
  } else {
    // Allow any non-empty value
    return new RegExp(".+");
  }
};
</script>

<style scoped></style>
