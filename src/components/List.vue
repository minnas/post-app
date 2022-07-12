<template>
  <div class="posts-main-container">
    <transition name="toogleInfo">
      <div class="posts-app-logo" v-if="logoVisible">
        <div class="top-bar">
          <Button :icon="faTimes" :type="ButtonType.ICON_ONLY" label="Hide Logo" @click="toggleLogo" :btnStyle="infoBtnStyles"/>
        </div>
        <img alt="Post App logo" src="../assets/logo.png" />
      </div>
    </transition>
    <transition name="toogleInfo">
      <div class="logo-btn" v-show="!logoVisible">
        <Button :icon="faImagePortrait" :type="ButtonType.ICON_ONLY" label="Show Logo" @click="toggleLogo" :btnStyle="infoBtnStyles"/>
      </div>
    </transition>
    <div class="header">
      <h1>Posts App</h1>
      <Button :icon="faInfo" :type="ButtonType.ICON_ONLY" label="Show Info" @click="showInfo" :btnStyle="infoBtnStyles"/>
    </div>
    <transition name="toogleInfo">
      <div class="info-block" v-show="visible">
        <Info v-model:visible="visible"/>
      </div>
    </transition>
    <div class="search-block"><search v-model:searchResult="searchResult" v-model:posts="posts"/></div>
    <div class="seach-results-container">
      <h3>Search results</h3>
      <div class="search-result">
        <list-item v-for="(item, i) of searchResult" :key="i" :item-store="itemStore" v-model:item="posts[i]"/>
      </div>
    </div>
    <div class="all-posts-container">
      <h3>All items</h3>
      <div class="posts-list">
        <list-item v-for="(item, i) of posts" :key="i" :item-store="itemStore" v-model:item="posts[i]"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import { IItemStore } from "./types/actions";
import { default as ListItem} from "./Item.vue"
import { default as Search} from "./Search.vue"
import { Post } from "./types/post";
import { search } from "./api/api";
import { faInfo, faTimes, faImagePortrait } from "@fortawesome/free-solid-svg-icons";

import { default as Button } from "./tools/Button.vue";
import { ButtonType, ButtonOptions } from "./tools/settings";
import { default as Info } from "./Info.vue";

export default defineComponent({
  props: {
  },
  components: {
    ListItem,
    Search,
    Info,
    Button
  },
  setup(props) {
    const posts = ref([] as Post[]);
    const options = reactive({
      posts: [] as Post[],
      searchResult: [] as Post[],
      visible: false,
      logoVisible: true
    });

    const infoBtnStyles = {
      alignSelf: "flex-start"
    } as ButtonOptions;

    onMounted(() => {
      search()
        .then((items) => {
          options.posts = items as Post[];
        })
    });

    const showInfo = () => {
      options.visible = true;
    };

    const toggleLogo = () => {
      options.logoVisible = !options.logoVisible;
    };

    const itemStore = {
      remove(id: string) {
        const index = posts.value.findIndex(item => item.id === id);
        if(index > -1) {
          posts.value.splice(index, 1);
          return true;
        }
        return false;
      },
      update(item: Post) {
        const index = options.posts.findIndex(listItem => listItem.id === item.id);
        if(index > -1) {
          options.posts.splice(index, 1, item);
        } else {
          options.posts.push(item);
        }
        return true;
      }
    } as IItemStore;

    return {
      itemStore,
      faInfo,
      faTimes,
      faImagePortrait,
      showInfo,
      ...toRefs(options),
      ButtonType,
      infoBtnStyles,
      toggleLogo
    };

  }
});
</script>
<style lang="css" scoped>
  .posts-main-container .header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: .5rem auto;
  }
  .toogleInfo-enter-active,
  .toogleInfo-leave-active {
    transition: all 0.25s ease;
  }
  .toogleInfo-enter-from,
  .toogleInfo-leave-to {
    opacity: 0;
  }
  .posts-list,
  .search-result {
    max-height: 25rem;
    overflow-y: scroll;
  }
  .posts-app-logo .top-bar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    max-width: 30rem;
    margin: auto;
  }
  .info-block {
    display: grid;
    justify-content: center;
    align-items: center;
    grid-row-gap: .25rem;
  }
  h3 {
    font-size: 1.2rem;
    font-weight: bold;
  }
</style>