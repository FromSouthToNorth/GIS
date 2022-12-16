<template>
  <a-drawer
    :visible="visible"
    @close="onClose"
  >
    {{ menu }}
  </a-drawer>
</template>

<script>
import menus from "/@/json/menu/menu.json"
import {computed, defineComponent} from "vue";

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String
    }
  },
  // emits:['onClose'],
  setup(props, ctx) {
    const visible = computed(() => props.visible);

    const menu = computed(() => {
      const menu = menus.find(item => item.type === props.type);
      console.log(menu.childMenus);
      return menu.childMenus;
    })

    const onClose = () => {
      ctx.emit('onClose');
    }

    return {visible, menu, onClose};
  }
})
</script>

<style scoped>

</style>
