<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useInventoryStore } from "../stores/useInventoryStore ";
import Cube from "./Cube.vue";
import CardInfo from "./CardInfo.vue";

const inventoryStore = useInventoryStore();
const draggedCubeIndex = ref<number | null>(null);

onMounted(() => {
  inventoryStore.initializeCubes();
});

const handleClick = (index: number) => {
  const cube = inventoryStore.cubes[index];
  cube.active = true;
  cube.count += 1;
  inventoryStore.updateCube(index, cube.count, cube.active);
};

const handleDragStart = (event: DragEvent, index: number) => {
  draggedCubeIndex.value = index;
  event.dataTransfer?.setData("text/plain", String(index));
  const target = event.target as HTMLElement;
  target.classList.add("dragging");
};

const handleDragEnd = (event: DragEvent) => {
  const target = event.target as HTMLElement;
  target.classList.remove("dragging");
  draggedCubeIndex.value = null;
};

const handleDrop = (event: DragEvent, index: number) => {
  event.preventDefault();
  if (draggedCubeIndex.value !== null && draggedCubeIndex.value !== index) {
    inventoryStore.swapCubes(draggedCubeIndex.value, index);
  }
};
</script>

<template>
  <div style="display: flex; gap: 50px">
    <CardInfo />
    <div class="inventory">
      <div class="grid">
        <div
          class="cube"
          v-for="(cube, index) in inventoryStore.cubes"
          :key="index"
          @click="handleClick(index)"
          @dragover.prevent
          @drop="handleDrop($event, index)"
        >
          <div
            class="cube-content"
            :draggable="true"
            @dragstart="handleDragStart($event, index)"
            @dragend="handleDragEnd($event)"
          >
            <Cube v-show="cube.active" class="button-press fadeIn" />
            <span class="counter">{{ cube.count }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url(../styles/inventory.scss);
</style>
