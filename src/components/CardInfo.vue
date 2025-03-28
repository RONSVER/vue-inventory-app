<script setup lang="ts">
import SkeletonLoader from "./SkeletonLoader.vue";
</script>

<template>
  <section class="card">
    <img src="../assets/Blur.png" alt="info" class="card__image" />

    <div class="card__content">
      <SkeletonLoader height="26px" width="190px" />

      <div class="card__details">
        <SkeletonLoader
          v-for="width in [155, 190, 170, 160, 140]"
          :key="width"
          height="10px"
          :width="`${width}px`"
        />
      </div>

      <SkeletonLoader height="10px" width="80px" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.card {
  width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 19px;
  border: 1px solid #4a4949;
  border-radius: 20px;
  padding: 16px;
  height: 523px;
  &__image {
    padding: 15px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 19px;
  }

  &__details {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
  }
}
</style>
