<template>
  <div ref="viewerRef" id="markdownViewer" :class="$props.class"></div>
</template>

<script setup>
import {defineProps, onBeforeUnmount, onDeactivated, ref, unref, watch} from "vue";
import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";
import VditorPreview from "vditor/dist/method.min";

const props = defineProps({
  value: {type: String},
  class: {type: String}
})
const viewerRef = ref(null);
const vditorPreviewRef = ref(null);

function init() {
  const viewerEL = unref(viewerRef);
  vditorPreviewRef.value = VditorPreview.preview(viewerEL, props.value, {
    mode: 'light',
    theme: {
      current: 'light',
    },
    hljs: {
      style: 'github'
    }
  })
}

watch(() => props.value, (v, oldValue) => {
  v !== oldValue && init();
});

function destroy() {
  const  vditorInstance = unref(vditorPreviewRef);
  if (!vditorInstance) return;
  try {
    vditorInstance.destroy();
  }
  catch (error) {}
  vditorPreviewRef.value = null;
}
onMountedOrActivated(init);

onBeforeUnmount(destroy);
onDeactivated(destroy);
</script>

<style scoped>

</style>
