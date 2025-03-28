<script setup lang="ts">
import SkeletonLoader from "./SkeletonLoader.vue";
</script>

<template>
  <section class="custom-box">
    <SkeletonLoader height="52px" width="100%" style="border-radius: 20px" />
    <img class="close" src="../assets//carbon_close.png" alt="carbon_close" />
  </section>
</template>

<style scoped lang="scss">
$border-color: #4a4949;
$border-radius: 18px;
$padding: 20px;

.custom-box {
  display: flex;
  padding: $padding;
  border: 1px solid $border-color;
  border-radius: $border-radius;
}

.close {
  width: 24px;
  height: 24px;
  padding-left: 20px;
}
</style>
