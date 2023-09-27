<!-- pages/success.vue -->

<template>
  <section>
    <img class="bg-img" src="../assets/imgs/background.png" alt="" />
    <div class="content-outer-container">
      <div class="content-inner-container">
        <h1 class="font-montserrat">
          {{ $t("h1-success") }}
          <span class="block mt-8"
            ><img class="inline" src="../assets/imgs/panot-white.webp" alt="" />
          </span>
        </h1>
        <p class="font-monserrat">
          {{ $t("p-success") }}
        </p>

        <p>Thank you for your purchase.</p>
        <!-- Display session details, e.g., transaction ID -->
        <p>Transaction ID: {{ sessionId }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const sessionId = ref(route.query.session_id);

onMounted(async () => {
  if (sessionId.value) {
    const response = await fetch(
      `/api/getTransactionDetails/${sessionId.value}`
    );
    const data = await response.json();
    console.log(data);
    // Handle the data, update other refs or reactive properties
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
