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

.placeholder-container{
  background-image: url("../../assets/placeholder.png");
  background-repeat: no-repeat;
  background-size: cover;
  height: 6rem;
  padding: 2rem 3rem;
  width: inherit;
}

.placeholder-container-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  grid-column-gap: 2rem;
  background-color: rgba(255, 255, 255, 0.6);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  border-radius: 8px;
}
.placeholder-icon {
  font-size: 2rem;
  color: rgba(0, 0, 0, .8);
}
.placeholder-container-inner span {
  font-style: italic;
  font-size: 1rem;
  color: rgba(0, 0, 0, .8);
}

</style>