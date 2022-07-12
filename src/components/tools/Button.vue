<template>
  <button
    :class="btnClass"
    :style="btnStyle"
    :title="label"
    :aria-label="label"
    :disabled="disabled"
  >
    <FontAwesomeIcon v-if="icon" :icon="icon" size="lg"></FontAwesomeIcon>
    <span class="btn-label" v-if="!onlyIcon">{{ label }}</span>
  </button>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { ButtonOptions, ButtonType, ButtonDefaults } from "./settings";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default defineComponent({
  props: {
    class: String,
    type: Object as () => ButtonType,
    label: String,
    icon: Object,
    btnStyle: Object as () => ButtonOptions,
    disabled: Boolean
  },
  components: {
    FontAwesomeIcon,
  },
  setup(props) {
    const type = props.type as ButtonType;
    const options = props.btnStyle || {} as ButtonOptions;
    const btnClasses = [props.class || ""];
    const onlyIcon = type === ButtonType.ICON_ONLY;

    if(onlyIcon) {
      btnClasses.push('only-icon');
    }

    const btnClass = btnClasses.join(" ");
    const btnStyle = computed(() => {
      return {
        "--var-margin": options.margin || ButtonDefaults.MARGIN,
        "--var-color": options.color || ButtonDefaults.COLOR,
        "--var-padding": options.padding || ButtonDefaults.PADDING,
        "--var-border": options.padding || ButtonDefaults.BORDER,
        "--var-background": options.padding || ButtonDefaults.BACKGROUND,
        "--var-align-self": options.alignSelf || ButtonDefaults.ALING_SELF
      }
    });
    
    return {
      onlyIcon,
      btnClass,
      btnStyle
    }
  },
})
</script>
<style land="postcss" scoped>
  button {
    outline: none;
    cursor: pointer;
    background: var(--var-background);
    margin: var(--var-margin);
    padding: var(--var-padding);
    border: var(--var-border);
    transition: all .15s;
    color: var(--var-color);
    font-size: 1rem;
    align-self: var(--var-align-self);
  }
  button.only-icon {
    border-radius: 50%;
  }
  button:not(.only-icon) {
    box-shadow: .2rem .2rem var(--var-color);
    border-radius: 5px;
  }
  button:hover {
    color:#080808;
    opacity: 0.7;
    font-size: 1.25rem;
  }
  button[disabled] {
    opacity: 0.6;
  }    
  button[disabled]:hover,
  button[disabled]:focus {
    cursor: not-allowed;
    color: var(--var-color);
    box-shadow: none;
  }
</style>

