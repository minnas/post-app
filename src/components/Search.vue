<template>
  <div class="search-coctail">
    <h3>Search post by title</h3>
    <div>
      <input type="text" v-model="searchStr"/>    
      <Button :type="ButtonType.ICON_ONLY" :icon="faSearch" @click="searchByTitle" :disabled="disabled"/>
    </div>
  </div>  
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { default as Button } from "./tools/Button.vue";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ButtonType } from "./tools/settings";
import { Post } from "./types/post";

export default defineComponent({
  props: {
    searchResult: Object as () => Post[],
    posts: Object as () => Post[]
  },
  emits: ["update:searchResult"],
  setup(props, {emit}) {
    const postDetails = ref();
    const searchStr = ref("");
    const disabled = computed(() => searchStr.value.length < 1);
    
    const searchByTitle = () => {
      if(props.posts && props.posts.length > 0) {
        const filtered = (props.posts as Post[]).filter(p => p.title.search(searchStr.value) > -1);
        emit("update:searchResult", filtered);
      }
    };

    return {
      faSearch,
      ButtonType,
      searchByTitle,
      postDetails,
      searchStr,
      disabled      
    }    
  },
  components: {
    Button
  }
})
</script>
<style lang="scss" scoped>

</style>