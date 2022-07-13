import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app');
window.onload = () => {
  const title = document.head.querySelector("title");
  if(title) {
    title.innerHTML = "Post App";
  }
};
