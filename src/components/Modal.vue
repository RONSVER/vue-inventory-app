<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import SkeletonLoader from "./SkeletonLoader.vue";
import "../styles/Modal.scss";

defineProps<{ show: boolean }>();
const emit = defineEmits(["close", "deleteItem"]);

const count = ref(0);
const showDeleteConfirmation = ref(false);

const closeModal = () => {
  emit("close");
};

const handleDeleteClick = () => {
  showDeleteConfirmation.value = true;
};

const handleConfirmDelete = () => {
  emit("deleteItem", count.value);
  closeModal();
};

const handleCancelDelete = () => {
  showDeleteConfirmation.value = false;
};
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-button" @click="closeModal">✖</button>
        <img
          src="../assets//CubeItemOne.png"
          class="modal-image"
          style="background-color: #333"
        />
        <div class="modal-details">
          <div style="display: flex; flex-direction: column; gap: 10px">
            <SkeletonLoader
              v-for="height in [20, 12, 12, 12, 12]"
              :key="height"
              :height="`${height}px`"
            />
          </div>
          <div class="modal-footer">
            <button class="delete-button" @click="handleDeleteClick">
              Удалить предмет
            </button>
          </div>
        </div>

        <!-- Инпут для удаления -->
        <div v-if="showDeleteConfirmation" class="delete-confirmation">
          <input
            v-model="count"
            type="number"
            min="0"
            :max="100"
            placeholder="Введите количество для удаления"
            class="delete-input"
          />
          <div class="delete-buttons">
            <button @click="handleConfirmDelete" class="confirm-button">
              Подтвердить
            </button>
            <button @click="handleCancelDelete" class="cancel-button">
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
@import url(../styles/Modal.scss);
</style>
