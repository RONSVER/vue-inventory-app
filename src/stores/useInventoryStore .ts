import { defineStore } from "pinia";

export const useInventoryStore = defineStore("inventory", {
  state: () => ({
    cubes: JSON.parse(localStorage.getItem("cubes") || "[]"),
    draggedCubeIndex: null as number | null,
  }),
  actions: {
    initializeCubes() {
      if (this.cubes.length === 0) {
        this.cubes = Array(25)
          .fill(null)
          .map(() => ({
            active: false,
            count: 0,
          }));
      }
    },
    updateCube(index: number, count: number, active: boolean) {
      this.cubes[index].count = count;
      this.cubes[index].active = active;

      if (this.cubes[index].count <= 0) {
        this.removeCube(index);
      } else {
        this.syncToLocalStorage();
      }
    },
    swapCubes(index1: number, index2: number) {
      const temp = this.cubes[index1];
      this.cubes[index1] = this.cubes[index2];
      this.cubes[index2] = temp;
      this.syncToLocalStorage();
    },
    removeCube(index: number) {
      this.cubes.splice(index, 1);
      this.syncToLocalStorage();
    },
    syncToLocalStorage() {
      localStorage.setItem("cubes", JSON.stringify(this.cubes));
    },
  },
});
