<script setup lang="ts">
import { defineProps } from "vue";

const { width, height } = defineProps({
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "20px",
  },
});
</script>

<template>
  <div
    class="skeleton"
    :style="{
      width: width,
      height: height,
    }"
  ></div>
</template>

<style scoped lang="scss">
.skeleton {
  background: linear-gradient(90deg, #4f4f4f 0%, #6f6f6f 50%, #4f4f4f 100%);
  background-size: 200% 100%;
  animation: skeleton-loading 3.5s ease-in-out infinite;
  border-radius: 5px;
}

@keyframes skeleton-loading {
  0% {
    background-position: -200% 0;
  }
  50% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
