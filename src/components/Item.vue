<template>
   <div class="post-item-container">
    <div class="edit-container" v-show="isEditMode">
      <div class="container-inner">
        <div class="edit-block">
          <div class="top-bar">
            <Button :icon="faTimes" label="Close" @click="close" :type="ButtonType.ICON_ONLY"/>    
          </div>
          <label for="title">Title</label>
          <textarea name="title" type="text" v-model="title"/>
          <label for="body">Content</label>
          <textarea name="body" type="text" v-model="body"/>
        </div>
      </div>
      <div class="edit-actions">
        <Button :icon="faCheck" label="Save" @click="save" :btnStyle="editBlockBtnStyles"/>
        <Button :icon="faTimes" label="Close" @click="close" :btnStyle="editBlockBtnStyles"/>
      </div>
    </div>
    <div class="details-container" v-show="!isEditMode">
      <div class="container-inner">
        <div class="title">{{title}}</div>
        <div class="summary">{{body}}</div>
      </div>
      <div class="actions">
        <Button :icon="faTrash" label="remove" v-if="showRemoveBtn" @click="remove" :type="ButtonType.ICON_ONLY"/>
        <button class="bookmark-btn" @click="bookmark" v-if="showBookmarkIcon" title="Add to bookmarks">
          <FontAwesomeLayers class="fa-3x">
            <FontAwesomeIcon
              :icon="faCircleSolid"
              transform="shrink-2"
              class="inner-circle"
            />
            <FontAwesomeIcon :icon="faCircle" transform="shrink-2" />
            <FontAwesomeIcon
              :icon="faBookmark"
              transform="shrink-10"
              class="bookmark"
            />
          </FontAwesomeLayers>
        </button>
        <button class="bookmark-btn remove" @click="removeBookmark" v-if="showRemoveBookmarkIcon" title="Remove from bookmarks">
          <FontAwesomeLayers class="fa-3x">
            <FontAwesomeIcon
              :icon="faCircleSolid"
              transform="shrink-2"
              class="inner-circle"
            />
            <FontAwesomeIcon :icon="faCircle" transform="shrink-2" class="outer-circle"/>
            <FontAwesomeIcon
              :icon="faBookmark"
              transform="shrink-10"
              class="bookmark"
            />
          </FontAwesomeLayers>
          <FontAwesomeIcon :icon="faTimesCircle" class="remove-flag-icon" />
        </button>
        <Button :icon="faPen" label="edit" :type="ButtonType.ICON_ONLY" @click="edit" v-if="showEditBtn"/>
      </div>
    </div>
   </div> 
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { IItemStore } from "./types/actions";
import { default as Button } from "./tools/Button.vue";
import { ButtonOptions, ButtonType } from "./tools/settings";
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
} from "@fortawesome/vue-fontawesome";
import {faPen, faCheck, faTimes, faCircle as faCircleSolid, faBookmark, faTrash, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { Post } from "./types/post";
import { ListType } from "./types/list";

export default defineComponent({
    props: {
      item: Object as () => Post,
      itemStore: Object as () => IItemStore,
      type: Object as () => ListType      
    },
    setup(props) {
      const options = reactive({
        title: props.item?.title,
        body: props.item?.body,
        isEditMode: false,
        showBookmarkIcon: props.type === ListType.POSTS || props.type === ListType.SEARCH,
        showRemoveBookmarkIcon: props.type as ListType === ListType.BOOKMARK,
        showRemoveBtn: false,
        showEditBtn: props.type as ListType === ListType.POSTS
      });
      
      const edit = () => {
        options.isEditMode = true;
      };
      const save = () => {
        const title = options.title;
        const body = options.body;
        props.itemStore?.update({...props.item, title, body} as Post);
        close();
      };
      const bookmark = () => {
        props.itemStore?.addToBookmarks(props.item as Post);
      };
      const close = () => {
        options.isEditMode = false;
      };
      const removeBookmark = () => {
        props.itemStore?.removeFromBookmarks(props.item?.id as string);
      };      
      const remove = () => {
        props.itemStore?.remove(props.item?.id as string);
      };

      const editBlockBtnStyles = {
        padding: ".5rem"
      } as ButtonOptions;

      return {
          ButtonType,
          faPen,
          edit,
          faCheck,
          faTimes,
          faCircleSolid,
          faCircle,
          faBookmark,
          faTrash,
          removeBookmark,
          bookmark,
          save,
          close,
          remove,
          faTimesCircle,
          ...toRefs(options),
          editBlockBtnStyles
      };
    },
    components: { Button, FontAwesomeIcon, FontAwesomeLayers }
})
</script>
<style lang="css" scoped>
  .post-item-container {
    display: flex;
    justify-content: center;
    align-items: center;    
  }
  .cocktail-item-inner {
    padding: .5rem 2rem;
  }
  .details-container,
  .edit-container {
    padding: .15rem;
    box-shadow: 1px 2px rgb(36, 35, 35);
    margin-bottom: .85rem;
    max-width: 30rem;
    min-width: 30rem;
    font-size: 1rem;
  }
  .edit-container {
    padding: 2rem .15rem;
  }
  .details-container .actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .edit-container .edit-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column-gap: .5rem;
  }
  .edit-block textarea {
    display: block;
    margin: 1rem;
    min-width: 25rem;
    min-height: 5rem;
  }
  .edit-block label {
    font-weight: bold;
    text-transform: uppercase;
  }
  .top-bar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  button.bookmark-btn {
    border: none;
    outline: none;
    transition: all 0.15s ease;
    background-color: transparent;
    cursor: pointer;
  }
  button.bookmark-btn:not(.remove):hover .inner-circle {
    color:rgb(68, 66, 66, .5);
  }
  .inner-circle {
     color: #ffffff;
  }
  button.bookmark-btn.remove .outer-circle,
  button.bookmark-btn.remove .bookmark {
     color: rgb(68, 66, 66);
  }
  button.bookmark-btn.remove:hover .inner-circle {
    color: rgba(68, 66, 66, .2);
  }
  button.bookmark-btn.remove:hover .bookmark {
    color: rgba(68, 66, 66, .7);
  }
  button.bookmark-btn.remove:hover .outer-circle {
    color: rgba(68, 66, 66, .7);
  }
  button.bookmark-btn.remove {
    position: relative;
  }
  button.bookmark-btn.remove:hover   .remove-flag-icon {
   color: rgba(68, 66, 66, .5);
  }
  .remove-flag-icon {
    position: absolute;
    top: 0;
    right: 9px;
    background-color: #ffffff;
    border-radius: 50%;
    color: rgb(68, 66, 66);
  }
  
</style>