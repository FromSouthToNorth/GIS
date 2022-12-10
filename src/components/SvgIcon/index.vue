<template>
<svg :class="svgClass" aria-hidden="true" :style="getStyle">
    <use :xlink:href="iconName" :fill="color" />
</svg>
</template>

<script>
import {computed, defineComponent} from "vue";

export default defineComponent({
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    size: {
      type: [Number, String],
      default: 16
    }
  },
  setup(props) {
    return {
      getStyle: computed(() => {
        const {size} = props;
        let s = `${size}`;
        s = `${s.replace('px', '')}px`;
        return {
          width: s,
          height: s,
        };
      }),
      iconName: computed(() => `#icon-${props.iconClass}`),
      svgClass: computed(() => {
        if (props.className) {
          return `svg-icon ${props.className}`;
        }
        return 'svg-icon';
      })
    }
  }
})
</script>namespace

<style lang="less" scoped>
.svg-icon {
  display: inline-block;
  overflow: hidden;
  fill: currentColor;
  vertical-align: -0.15em;
}

.svg-icon-spin {
  animation: loadingCircle 1s infinite linear;
}
</style>
