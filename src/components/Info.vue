<template>
  <div class="info-block">
    <div class="info-tools">
      <Button :icon="faTimes" :type="ButtonType.ICON_ONLY" label="close" @click="close"/>
    </div>
    <div class="info-block-inner">
      <div>{{infoText}}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {faTimes } from "@fortawesome/free-solid-svg-icons";
import { default as Button } from "./tools/Button.vue";
import { ButtonType } from "./tools/settings";

export default defineComponent({
  props: {
    visible: Boolean
  },
  emits: ["update:visible"],
  components: {
    Button
  },
  setup(props, {emit}) {
    const infoText = `This is an simple Post app which uses free api with dummy data. 
                      You can seach posts by title and search resuls are listed above all post list`;

    const close = () => {
      emit("update:visible", false);
    };                      

    return {
      infoText,
      faTimes,
      ButtonType,
      close
    }                  
  },
})
</script>
<style lang="css" scoped>
  .info-block {
    max-width: 30rem;
    font-size: 1rem;
    box-shadow: 1px 2px rgb(40, 26, 234);
    padding: 1rem;
    border-radius: 5px;
  }
  .info-block .info-tools {
    display: flex;
    justify-content: flex-end;
    align-items: right;
    margin: .25rem .5rem; 
  }
</style>