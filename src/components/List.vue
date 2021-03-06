<template>
  <div class="posts-main-container">
    <transition name="toogleInfo">
      <div class="posts-app-logo" v-if="logoVisible">
        <div class="top-bar">
          <Button :icon="LogoZoomBtn" :type="ButtonType.ICON_ONLY" :label="LogoZoomLabel" @click="resize" :btnStyle="infoBtnStyles"/>
          <Button :icon="faTimes" :type="ButtonType.ICON_ONLY" label="Hide Logo" @click="toggleLogo" :btnStyle="infoBtnStyles"/>
        </div>
        <img alt="Post App logo" src="../assets/logo.png" :class="logoClass"/>
      </div>
    </transition>
    <transition name="toogleInfo">
      <div class="logo-btn" v-show="!logoVisible">
        <Button :icon="faImagePortrait" :type="ButtonType.ICON_ONLY" label="Show Logo" @click="toggleLogo" :btnStyle="infoBtnStyles"/>
      </div>
    </transition>
    <Toast v-model:visible="toastVisible" :message="toastMsg" :title="toastTitle" :type="toastType"/>
    <div class="header">
      <h1>Posts App</h1>
      <Tooltip
        v-model:type="TooltipType.RIGHT"
        class="info-tooltip"
      >
        <template #content>
          <Button :icon="faInfo" :type="ButtonType.ICON_ONLY" @click="showInfo" :btnStyle="infoBtnStyles"/>
        </template>
        <template #tooltip>
          <span>
            Show the About info of this app
          </span>
        </template>
      </Tooltip>
    </div>
    <transition name="toogleInfo">
      <div class="info-block" v-show="visible">
        <Info v-model:visible="visible"/>
      </div>
    </transition>
    <div class="search-block"><search v-model:searchResult="searchResult" v-model:posts="posts"/></div>
    <div class="seach-results-container list-container">
      <div class="list-header">
        <h3>Search results</h3>
        <Button label="toggle" :icon="toggleSearchIcon" :type="ButtonType.ICON_ONLY" @click="toggleList(ListType.SEARCH)"/>
      </div>
      <transition name="toogleInfo">
        <div class="search-result" v-show="searchVisible">
          <transition name="toogleInfo">
            <PlaceHolder v-if="searchResult.length < 1">
              <template #content>
                <FontAwesomeIcon :icon="faBroomBall" size="lg" class="placeholder-icon"/>
                <span>Hmm.. Nothing here at the moment</span>
              </template>
            </PlaceHolder>
          </transition>
          <list-item v-for="(item, i) of searchResult" :key="i" :item-store="itemStore" v-model:item="posts[i]" :type="ListType.SEARCH"/>
        </div>
      </transition>
    </div>
    <div class="all-posts-container list-container">
      <div class="list-header">
        <h3>All items</h3>
        <Button label="toggle" :icon="toggleListIcon" :type="ButtonType.ICON_ONLY" @click="toggleList(ListType.POSTS)"/>
      </div>
      <transition name="toogleInfo">
        <div class="posts-list" v-show="listVisible">
          <list-item v-for="(item, i) of posts" :key="i" :item-store="itemStore" v-model:item="posts[i]" :type="ListType.POSTS"/>
        </div>
      </transition>
    </div>
    <div class="bookmark-posts-container list-container">
      <div class="list-header">
        <h3>Bookmarked items</h3>
        <Button label="toggle" :icon="toggleBookmarkIcon" :type="ButtonType.ICON_ONLY" @click="toggleList(ListType.BOOKMARK)"/>
      </div>
      <transition name="toogleInfo">
        <div class="bookmark-list" v-show="bookmarkedVisible">
          <transition name="toogleInfo">
            <PlaceHolder v-if="bookMarked.length < 1">
              <template #content>
                <FontAwesomeIcon :icon="faBroomBall" size="lg" class="placeholder-icon"/>
                <span>Hmm.. Nothing here at the moment</span>
              </template>
            </PlaceHolder>
          </transition>
          <list-item v-for="(item, i) of bookMarked" :key="i" :item-store="itemStore" v-model:item="bookMarked[i]" :type="ListType.BOOKMARK"/>
        </div>
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from "vue";
import { IItemStore } from "./types/actions";
import { default as ListItem} from "./Item.vue"
import { default as Search} from "./Search.vue"
import { Post } from "./types/post";
import { search } from "./api/api";
import { faInfo, faTimes, faImagePortrait, faChevronDown, faChevronUp, faPlusCircle, faMinusCircle, faBroomBall} from "@fortawesome/free-solid-svg-icons";
import { default as Tooltip } from "./tools/Tooltip.vue";
import { default as Button } from "./tools/Button.vue";
import { ButtonType, ButtonOptions, TooltipType, ToastType, ToasOptions } from "./tools/settings";
import { ListType } from "./types/list";
import { default as Info } from "./Info.vue";
import { default as Toast } from "./tools/Toast.vue";
import { default as PlaceHolder} from "./tools/Palceholder.vue";
import {
  FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";


export default defineComponent({
  props: {
  },
  components: {
    ListItem,
    Search,
    Info,
    Button,
    Tooltip,
    Toast,
    PlaceHolder,
    FontAwesomeIcon
  },
  setup(props) {
    const options = reactive({
      posts: [] as Post[],
      searchResult: [] as Post[],
      bookMarked: [] as Post[],
      visible: false,
      logoVisible: true,
      searchVisible: false,
      listVisible: false,
      bookmarkedVisible: false,
      tooltipVisible: false,
      toastVisible: false,
      toastType: ToastType.ACTION_ADD,
      toastMsg: "",
      toastTitle: "",
      toggleSearchIcon: computed(() =>{
        if(options.searchVisible)
          return faChevronUp;
        return faChevronDown;  
        }),
      toggleListIcon: computed(() =>{
        if(options.listVisible)
          return faChevronUp;
        return faChevronDown;  
      }),
      toggleBookmarkIcon: computed(() =>{
        if(options.bookmarkedVisible)
          return faChevronUp;
        return faChevronDown;  
      }),
      logoMaximized: false,
      LogoZoomBtn: computed(() => {
        if(options.logoMaximized)
          return faMinusCircle;
        return faPlusCircle;  
      }),
      LogoZoomLabel: computed(() => {
        if(options.logoMaximized)
          return "minimize";
        return "maximize";  
      }),
      logoClass: computed(() => {
        if(options.logoMaximized)
          return  "post-app-logo maximized";
        return "post-app-logo";  
      })
    });
    
    const toggleList = (type: ListType) => {
      switch(type) {
        case ListType.BOOKMARK:
          options.bookmarkedVisible = !options.bookmarkedVisible;
        break;      
        case ListType.SEARCH:
          options.searchVisible = !options.searchVisible;
        break;      
        default:
          options.listVisible = !options.listVisible;
        break;      
      }
      return false;
    };

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

    const resize = () => {
      options.logoMaximized = !options.logoMaximized;
    };
    const showToast = ( settings: ToasOptions ) => {
        options.toastTitle = settings.title as string;
        options.toastMsg = settings.msg as string;
        options.toastType = settings.type as ToastType;
        options.toastVisible = true;
    };
    const itemStore = {
      remove(id: string) {
        const index = options.posts.findIndex(item => item.id === id);
        if(index > -1) {
          options.posts.splice(index, 1);
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
      },
      addToBookmarks(item: Post) {
        const index = options.bookMarked.findIndex(itm => itm.id === item.id);
        if(index < 0) {
          options.bookMarked.push(item);
          showToast({title: "Bookmark", msg: "Post added to bookmarks"} as ToasOptions);
          return true;
        }
      },
      removeFromBookmarks(id: string) {
        const index = options.bookMarked.findIndex(item => item.id === id);
        if(index > -1) {
          options.bookMarked.splice(index, 1);
          showToast({title: "Bookmark", msg: "Post removed from bookmarks", type: ToastType.ACTION_REMOVE} as ToasOptions);
          return true;
        }
        return false;
      }
    } as IItemStore;

    return {
      itemStore,
      faInfo,
      faTimes,
      faBroomBall,
      faImagePortrait,
      showInfo,
      ...toRefs(options),
      ButtonType,
      infoBtnStyles,
      toggleLogo,
      toggleList,
      resize,
      ListType,
      TooltipType
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
    height: 0;
  }
  .posts-list,
  .search-result {
    max-height: 25rem;
    overflow-y: scroll;
    max-width: 45rem;
    box-shadow: 2px 5px rgba(0,0,0,.4);
  }
  .list-container {
    max-width: 45rem;
    min-width: 45rem;
    margin: auto;
  }
  .posts-app-logo .top-bar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    max-width: 35rem;
    margin: auto;
  }
  .info-block {
    display: grid;
    justify-content: center;
    align-items: center;
    grid-row-gap: .25rem;
  }
  h3 {
    font-weight: bold;
    filter: drop-shadow(20px 10px 4px rgba(0,0,0,.35));    
  }
  .list-header {
    font-size: 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
  }
  .post-app-logo {
    max-height: 10rem;
    border-radius: 25%;
    transition: all 0.15s ease;
    filter: drop-shadow(20px 10px 4px rgba(0,0,0,.4));    

  }
  .post-app-logo.maximized {
    max-height: 15rem;
  }
</style>