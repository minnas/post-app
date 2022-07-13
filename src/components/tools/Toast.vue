<template>
  <transition name="toggleContent">
    <div
      :class="['post-action-toast', { error: isErrorMgs }]"
      v-show="visible"
    >
      <div :class="['post-action-toast-content', { error: isErrorMgs }]">
        <FontAwesomeIcon :icon="messageIcon" class="message-icon" />
        <div class="message-content">
          <div class="message-header" v-if="title">{{ title }}</div>
          <div class="message-body" v-if="message">{{ message }}</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { computed, defineComponent, onUpdated } from "vue";
import { ToastType } from "./settings";
import {
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default defineComponent({
  props: {
    visible: Boolean,
    type: Object as () => ToastType,
    message: String,
    title: String,
    displayTime: { type: Number, required: false, default: 1500 },
  },
  components: {
    FontAwesomeIcon,
  },
  emits: ["update:visible"],
  setup(props, { emit }) {
    const isErrorMgs = computed(
      () => props.type && props.type == ToastType.ACTION_REMOVE
    );
    const messageIcon = computed(() =>
      isErrorMgs.value ? faExclamationCircle : faCheckCircle
    );

    onUpdated(() => {
      if (props.visible) {
        setTimeout(() => {
          emit("update:visible", false)
        }, props.displayTime);
      }
    });

    return {
      isErrorMgs,
      messageIcon,
    };
  },
});
</script>
<style lang="css" scoped>
.post-action-toast {
  width: fit-content;
  max-width: 55rem;
  height: 4.5rem;
  border-left: 6px solid #4fb783;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  z-index: 10;
  right: 25%;
  top: 25%;
  background: #ffffff;
  box-shadow: -0.6px 2px 10px rgba(0, 0, 0, 0.15);
}
.post-action-toast .message-icon {
  color: #4fb783;
}
 .post-action-toast.error {
  border-left-color: #e74b3c;
}
.post-action-toast.error .message-icon {
  color: #e74b3c;
  font-size: 1.25rem;
}
.post-action-toast-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  grid-column-gap: 1rem;
  padding: .5rem 1rem;
}
.post-action-toast-content .message-body {
  font-size: 1.25rem;
  color: #000;
}
.post-action-toast-content .message-header {
  font-weight: 700;
  color: #000;
  text-align: left;
}
</style>
