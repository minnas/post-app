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
        <Button :icon="faCheck" label="Save" @click="save"/>
        <Button :icon="faTimes" label="Close" @click="close"/>
      </div>
    </div>
    <div class="details-container" v-show="!isEditMode">
      <div class="container-inner">
        <div class="title">{{title}}</div>
        <div class="summary">{{body}}</div>
      </div>
      <div class="actions">
        <Button :icon="faPen" label="edit" :type="ButtonType.ICON_ONLY" @click="edit"/>
      </div>
    </div>
   </div> 
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { IItemStore } from "./types/actions";
import { default as Button } from "./tools/Button.vue";
import { ButtonType } from "./tools/settings";
import {faPen, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Post } from "./types/post";

export default defineComponent({
    props: {
      item: Object as () => Post,
      itemStore: Object as () => IItemStore,
    },
    setup(props) {
      const options = reactive({
        title: props.item?.title,
        body: props.item?.body,
        isEditMode: false
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
      const close = () => {
        options.isEditMode = false;
      };
      return {
          ButtonType,
          faPen,
          edit,
          faCheck,
          faTimes,
          save,
          close,
          ...toRefs(options)
      };
    },
    components: { Button }
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
</style>