<script setup lang="ts">
import { onMounted, ref } from "vue";
import Cube from "./Cube.vue";
import CardInfo from "./CardInfo.vue";
import DownBlock from "./DownBlock.vue";
import Modal from "./Modal.vue";
import { useInventoryStore } from "../stores/useInventoryStore ";

const inventoryStore = useInventoryStore();
const draggedCubeIndex = ref<number | null>(null);
const hoveredCubeIndex = ref<number | null>(null);
const rightClickedCubeIndex = ref<number | null>(null);
const showModal = ref(false);

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

const handleMouseEnter = (index: number) => {
  hoveredCubeIndex.value = index;
};

const handleMouseLeave = () => {
  hoveredCubeIndex.value = null;
};

const handleRightClick = (event: MouseEvent, index: number) => {
  event.preventDefault();
  rightClickedCubeIndex.value = index;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  rightClickedCubeIndex.value = null;
};

const deleteItem = (count: number) => {
  if (rightClickedCubeIndex.value !== null) {
    const cube = inventoryStore.cubes[rightClickedCubeIndex.value];
    cube.count -= count;
    if (cube.count < 0) {
      cube.count = 0;
    }
    inventoryStore.updateCube(
      rightClickedCubeIndex.value,
      cube.count,
      cube.active
    );
  }
};
</script>

<template>
  <div>
    <div style="display: flex; gap: 50px; margin: 30px 0">
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
            @mouseenter="handleMouseEnter(index)"
            @mouseleave="handleMouseLeave"
            @contextmenu="handleRightClick($event, index)"
          >
            <div
              class="cube-content"
              :draggable="true"
              @dragstart="handleDragStart($event, index)"
              @dragend="handleDragEnd($event)"
            >
              <Cube
                v-show="cube.count > 0 && cube.active"
                class="button-press fadeIn"
              />
              <span class="counter">{{ cube.count }}</span>
            </div>

            <div
              v-if="
                cube.count > 0 &&
                hoveredCubeIndex === index &&
                rightClickedCubeIndex === null
              "
              class="tooltip fade-in"
            >
              Информация
            </div>

            <div
              v-if="rightClickedCubeIndex === index && cube.count > 0"
              class="modal"
              :class="{ show: showModal }"
            >
              <Modal
                @delete-item="deleteItem"
                :show="!!rightClickedCubeIndex"
                @close="closeModal"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <DownBlock />
  </div>
</template>

<style scoped lang="scss">
@import url(../styles/inventory.scss);
</style>
