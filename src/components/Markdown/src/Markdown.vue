<template>
  <div ref="wrapRef"></div>
</template>

<script>
import {
  defineComponent,
  ref,
  unref,
  nextTick,
  watch,
  onDeactivated, onBeforeUnmount
} from "vue";
import Vditor from "vditor";
import "vditor/dist/index.css";
import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated.js";

export default defineComponent({
  inheritAttrs: false,
  props: {
    height: {type: Number, default: 360},
    value: {type: String, default: ''},
  },
  emits: ['change', 'get', 'update:value'],
  setup(props, {attrs, emit}) {
    const wrapRef = ref(null);
    const vditorRef = ref(null);
    const initedRef = ref(false);
    const valueRef = ref(props.value || '');

    watch(() => props.value, (v) => {
      if (v !== valueRef.value) {
        instance.getVditor().setValue(v);
      }
      valueRef.value = v;
    })

    function init() {
      const wrapEl = unref(wrapRef);
      if (!wrapEl) return;
      const bindValue = {...attrs, ...props};
      const insEditor = new Vditor(wrapEl, {
        theme: 'light',
        lang: 'zh_CN',
        mode: 'sv',
        fullscreen: {
          index: 520,
        },
        preview: {
          theme: {
            // 设置内容主题
            current: 'light',
          },
          hljs: {
            // 设置代码块主题
            style: 'github',
          },
          actions: [],
        },
        input: (value) => {
          valueRef.value = value;
          emit('update:value', value);
          emit('change', value);
        },
        after: () => {
          nextTick(() => {
            insEditor.setValue(valueRef.value);
            vditorRef.value = insEditor;
            initedRef.value = true;
            emit('get', instance);
          })
        },
        blur: () => {
          //unref(vditorRef)?.setValue(props.value);
        },
        ...bindValue,
        cache: {
          enable: false,
        },
      });
    }

    const instance = {
      getVditor: () => {
        return vditorRef.value
      }
    };

    function destroy() {
      const vditorInstance = unref(vditorRef);
      if (!vditorInstance) return;
      try {
        vditorInstance.destroy();
      } catch (error) {
      }
      vditorRef.value = null;
      initedRef.value = false;
    }

    onMountedOrActivated(init);
    onBeforeUnmount(destroy);
    onDeactivated(destroy);

    return {
      wrapRef,
      ...instance,
    }
  }
});
</script>

<style scoped>

</style>
