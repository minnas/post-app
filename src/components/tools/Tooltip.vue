<template>
  <div
    class="tooltip-box"
    @mouseenter="toggle"
    @mouseleave="toggle"
    ref="tooltipContainer"
  >
    <slot name="content" />
    <transition name="toggleTooltip">
      <div
        :style="tooltipStyles"
        :class="tooltipClass"
        v-show="tooltipVisible"
        ref="tooltip"
      >
        <slot name="tooltip" />
      </div>
    </transition>
  </div>  
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import {
  TooltipType,
  TooltipOptions
} from "./settings";

export default defineComponent({
  props: {
    type: Object as () => TooltipType,
    options: Object as () => TooltipOptions
  },
  setup(props, { emit }) {
    const visible = ref();
    const tooltip = ref();
    const tooltipVisible = computed(() => visible.value);
    const type = props.type as TooltipType;
    const options = props.options || {} as TooltipOptions;

    const tooltipClass = computed(() => {
      let className = "tooltip";
      switch (type) {
        case TooltipType.TOP:
          className += " top";
          break;
        case TooltipType.LEFT:
          className += " left";
          break;
        case TooltipType.RIGHT:
          className += " right";
          break;
        case TooltipType.BOTTOM:
          className += " bottom";
          break;
      }
      return className;
    });

    const toggle = (e:Event) => {
      if (e.type == "mouseenter") {
        visible.value = true;
      } else {
        visible.value = false;
      }
    };

    /**define custom styles for tooltip */
    const tooltipStyles = computed(() => {
      return {
        "--tooltip-bgcolor": options.bgColor || "#ffffff",
        "--tooltip-color": options.fontColor || "#000000",
        "--tooltip-arrow-border-color":
          options.arrowBorderColor || "#080808",
        "--tooltip-arrow-shadow-color":
          options.arrowBorderShadowColor || "transparent",
        "--tooltip-border": options.border || "1px solid #080808",
        "--tooltip-left": options.left || "50%",
        "--tooltip-top": options.top || "50%",
        "--tooltip-min-width": options.minWidth || "10rem",
        "--tooltip-text-align": options.textAlign || "center",
        "--tooltip-border-radius": options.borderRadius || "5px",
        "--tooltip-padding": options.padding || "1.2rem 0.7rem",
        "--tooltip-zIndex": options.zIndex || "10",
        "--tooltip-right": options.right || "calc(100% + 1.1rem)",
        "--tooltip-animation-speed": options.animationSpeed || "0.15s",
        "--tooltip-animation-easing": options.animationEasing || "ease",
        "--tooltip-font-family": options.fontFamily || "Open Sans, sans-serif",
      };
    });

    return {
      toggle,
      tooltipVisible,
      tooltipClass,
      tooltipStyles,
      tooltip,
    };
  },
});
</script>
<style lang="css" scoped>
.tooltip {
  min-width: var(--tooltip-min-width);
  background-color: var(--tooltip-bgcolor);
  color: var(--tooltip-color);
  text-align: var(--tooltip-text-align);
  border-radius: var(--tooltip-border-radius);
  padding: var(--tooltip-padding);
  position: absolute;
  transform: translate(0, -50%);
  top: var(--tooltip-top);
  left: var(--tooltip-left);
  border: var(--tooltip-border);
  z-index: var(--tooltip-zIndex);
  font-family: var(--tooltip-font-family);
}
.tooltip.bottom::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 100%;
  margin-top: -0.5rem;
  border-width: 0.5rem;
  border-style: solid;
  border-color: transparent transparent var(--tooltip-arrow-border-color)
    transparent;
  filter: drop-shadow(0 -1px 1px var(--tooltip-arrow-shadow-color));
}
.tooltip.right {
  left: calc(100% + 2rem);
}
.tooltip.right::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -0.5rem;
    border-width: 0.5rem;
    border-style: solid;
    border-color: transparent var(--tooltip-arrow-border-color) transparent
      transparent;
}
.tooltip.left {
  left: auto;
  right: var(--tooltip-right);
}
.tooltip.top {
  top: auto;
  bottom: var(--tooltip-right);
}
.tooltip-box {
  position: relative;
}
.toggleTooltip-enter-active,
.toggleTooltip-leave-active {
  transition: opacity var(--tooltip-animation-speed)
    var(--tooltip-animation-easing);
}
.toggleTooltip-enter-from,
.toggleTooltip-leave-to {
  opacity: 0;
}
</style>
