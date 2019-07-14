import Vue from 'vue/dist/vue.esm.js'
import TopMenu from './components/TopMenu';
import Modal from './components/Modal';

import  "./scss/app.scss";

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  data: {
    regFolded: true,
    showVideo1: false,
    showVideo2: false,
  },
  methods:{
    regToggle(){
      console.log('tg');
      this.regFolded = !this.regFolded;
    },
    scrollTo(id){
      console.log(id);
      let el = document.querySelector(id);
      console.log(el);
      el.scrollIntoView(true);
    },
    showVideo(id){
      this.showVideo1 = false;
      this.showVideo2 = false;
      if(id == 1){
        this.showVideo1 = true;
      } else {
        this.showVideo2 = true;
      }
    },
  },
  components:{
    TopMenu,
    Modal
  }
});