<template>
  <div>
    <!-- <component
      :is="currentComponent"
      @next="nextStep"
      @previous="previousStep"
    /> -->
    <h1>hello</h1>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { formSteps } from ".././stores/formSteps";
</script>

<style scoped></style>
