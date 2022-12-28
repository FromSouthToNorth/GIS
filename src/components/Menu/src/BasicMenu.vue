<template>
  <Menu>

  </Menu>
</template>

<script>
import {defineComponent, reactive, ref} from "vue";
import {Menu} from "ant-design-vue";

export default defineComponent({
  name: "BasicMenu",
  components: {
    Menu,
  },
  props: {
    menus: {
      type: Array
    }
  },
  emits: ['menuClick'],
  setup(props, {emit}) {
    const isClickGo = ref(false);
    const currentActiveMenu = ref('');

    const menuState = reactive({
      defaultSelectedKeys: [],
      openKeys: [],
      selectedKeys: [],
      collapsedOpenKeys: [],
    })
  }
})
</script>

<style scoped>

</style>
