<template>
  <div
    class="movearea"
    @mousemove="onMousemove"
    :style="{backgroundColor: `hsl(${x}, 80%, 50%)`}"
  >
    <p>Move your mouse across this div...</p>
    <p>x: {{x}}</p>
  </div>
</template>

<script setup>
import {ref} from "vue";

const x = ref(0);
function onMousemove(e) {
  x.value = e.clientX;
}
</script>

<style scoped>
.movearea {
  width: 400px;
  height: 200px;
  padding: 10px;
  border-radius: 6px;
  transition: 0.3s background-color ease;
}
</style>
