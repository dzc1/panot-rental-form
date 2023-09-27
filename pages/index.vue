<template>
  <section>
    <img class="bg-img" src="../assets/imgs/background.png" alt="" />
    <div class="content-outer-container">
      <div class="content-inner-container">
        <form>
          <label
            class="block mb-2 text-xl font-light text-white"
            for="locale-select"
            >{{ $t("language") }}:
          </label>
          <div class="flex items-center justify-center">
            <select
              class="w-1/4 py-2 px-4 text-sm text-black font-monserrat border border-gray-200 focus:border-green-600 focus:outline-green-600 rounded-lg"
              id="locale-select"
              v-model="$i18n.locale"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
        </form>
        <h1 class="font-montserrat">
          {{ $t("h1-home") }}
          <span class="block"
            ><img class="inline" src="../assets/imgs/panot-white.webp" alt="" />
          </span>
        </h1>
        <p class="font-monserrat">
          {{ $t("p-home") }}
        </p>
        <button @click="overlayFunc">{{ $t("cta-home-get-started") }}</button>
      </div>
    </div>
    <!-- Overlay Section -->

    <div v-if="showOverlay" class="overlay">
      <div
        class="w-4/5 sm:w-11/12 md:w-3/4 lg:w-5/6 xl:w-85vw mt-[10%] lg:mt-[5%]"
      >
        <!-- Your content goes here T-->
        <div
          :class="['overlay-content', { 'animate-slide-in': animateOverlay }]"
        >
          <Form @closeFunction="overlayFunc" />
        </div>
      </div>
      <!-- <div class="p-2 md:p-4 flex items-center">
          <div
            :class="['overlay-content', { 'animate-slide-in': animateOverlay }]"
          >
            <Form @closeFunction="overlayFunc" />
          </div>
        </div> -->
    </div>
  </section>
</template>

<script setup>
import { exportToPDF } from "#imports";
const showOverlay = ref(false);
const animateOverlay = ref(false);

// Use ref to create a reactive data property
const isStepNine = ref(false);
const overlayFunc = (stepNumber) => {
  showOverlay.value = !showOverlay.value;
  animateOverlay.value = !animateOverlay.value;
  console.log(`Step number emitted from form component: ${stepNumber}`);

  // Check if the emitted step number is 9 (form summary)
  if (stepNumber === 9) {
    // Apply the styling when step 9 is emitted
    isStepNine.value = true;
  } else {
    // Remove the styling when any other step is emitted
    isStepNine.value = false;
  }
};

// Watch the isStepNine property and apply CSS styling accordingly
watch(isStepNine, (newValue) => {
  // Get the overlay element
  const overlayElement = document.querySelector(".overlay");

  if (overlayElement) {
    // Apply CSS styling based on the value of isStepNine
    if (newValue) {
      overlayElement.classList.add("mt-[10%]");
    } else {
      overlayElement.classList.remove("mt-[10%]");
    }
  }
});
</script>

<style>
section {
  @apply h-screen relative py-20 md:py-36 overflow-hidden bg-gray-100;
}

.bg-img {
  @apply absolute top-0 left-0 w-full h-full md:object-top object-cover;
}
.content-outer-container {
  @apply relative container px-4 mx-auto;
}
.content-inner-container {
  @apply text-center md:text-center;
}
.content-inner-container h1 {
  @apply text-4xl sm:text-6xl  text-gray-100 mb-12;
}
.content-inner-container p {
  @apply mb-12 text-white text-xl;
}
.content-inner-container button {
  @apply w-full md:w-1/2 bg-white text-black hover:bg-transparent hover:border  hover:text-white p-6 py-4 rounded-lg;
}
.overlay {
  @apply fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-20 overflow-y-auto h-full;
}

.overlay-content {
  @apply bg-white rounded-lg p-4;
}
@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes slide-out {
  100% {
    opacity: 1;
    transform: translateY(0);
  }
  50% {
    opacity: 0;
    transform: translateY(100%);
  }
}
.animate-slide-in {
  animation: slide-in 0.5s ease-in-out;
}
.animate-slide-out {
  animation: slide-out 0.5s ease-in-out;
}
</style>
