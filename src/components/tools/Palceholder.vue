<template>
  <div class="placeholder-container">
    <div class="placeholder-container-inner">
      <slot name="content"/>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
  setup() {
  }

});
</script>
<style lang="css" scoed>
.placeholder-container,
.placeholder-container-inner {
  width: 100%;
}
.placeholder-container-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column-gap: 2rem;
  height: 6rem;
}
.placeholder-icon {
  font-size: 3rem;
  color: rgba(0, 0, 0, .8);
}
.placeholder-container-inner span {
  font-style: italic;
  font-size: 1.25rem;
  color: rgba(0, 0, 0, .8);
}

</style>