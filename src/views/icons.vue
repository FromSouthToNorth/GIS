<template>
  <div class="flex flex-wrap justify-center">
    <div
      class="flex m-2 icon-item"
      :key="index"
      v-for="({name}, index) in iconsJson">
      <a :title="name">
        <Icon :icon="name" size="26" />
      </a>
    </div>
  </div>
</template>

<script setup>
import Icon from "/@/components/Icon/src/Icon.vue";
import iconsJson from "/@/json/icons/logos.json"
</script>

<style lang="less" scoped>
.flex {
  display: flex;
}
.flex-wrap {
  flex-wrap: wrap;
}

.justify-center {
  justify-content: center;
}

.m-2 {
  margin: 0.3rem;
  padding: 0.2rem;
}

.icon-item {
  transition: transform .15s ease-in-out;
  border-radius: 6px;
}

.icon-item:hover {
  text-decoration: none;
  transform: translateY(-2%);
  background-color: #5333;
}
</style>
