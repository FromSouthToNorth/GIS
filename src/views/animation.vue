<template>
  <div class="animation">
    <CssClass />
    <StateDriven />
    <DragMe />
    <input-number />
  </div>
</template>

<script>
import CssClass from "/@/components/Animation/CssClass.vue";
import StateDriven from "/@/components/Animation/StateDriven.vue";
import DragMe from "/@/components/Animation/DragMe.vue";
import InputNumber from "/@/components/Animation/InputNumber.vue";

export default {
  name: "animation",
  components: {InputNumber, DragMe, StateDriven, CssClass}
}
</script>

<style scoped>
.animation {
  margin: 10px;
}
div + div {
  margin-top: 10px;
}
</style>
