<template>
  <div>
    <h1>hello</h1>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useFormStepsStore } from "../stores/formSteps";

console.log(useFormStepsStore);

const steps = useFormStepsStore.steps;
const currentStepIndex = ref(0);

const currentComponent = computed(
  () => steps[currentStepIndex.value].component
);

const nextStep = () => {
  if (currentStepIndex.value < steps.length - 1) {
    currentStepIndex.value++;
  }
};

const previousStep = () => {
  if (currentStepIndex.value > 0) {
    currentStepIndex.value--;
  }
};
</script>

<style scoped></style>
