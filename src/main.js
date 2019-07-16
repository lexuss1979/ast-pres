import Vue from 'vue/dist/vue.esm.js'
import TopMenu from './components/TopMenu';
import Modal from './components/Modal';
import Dioram from './components/Dioram';

import 'vueperslides/dist/vueperslides.css'

import { VueperSlides, VueperSlide } from 'vueperslides'

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
      let el = document.querySelector(id);
      let y = el.offsetTop -108;
      window.scrollTo({
        top: y,
        behavior: "smooth"
      });
    },
    showVideo(id){
      this.showVideo1 = false;
      this.showVideo2 = false;
      if(id == 1){
        this.showVideo1 = true;
        this.$nextTick(function(){
          document.getElementById('player1').contentWindow.postMessage('{"event":"command","func":"seekTo","args":"[1,true]"}', '*');
          document.getElementById('player1').contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        });
      } else {
        this.showVideo2 = true;
        this.$nextTick(function(){
          document.getElementById('player2').contentWindow.postMessage('{"event":"command","func":"seekTo","args":"[1,true]"}', '*');
          document.getElementById('player2').contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');


        });

      }
      this.disableScrolling();
    },
    onCloseModal(){
      this.enableScrolling();
    },
    disableScrolling(){
        var x=window.scrollX;
        var y=window.scrollY;
        window.onscroll=function(){window.scrollTo(x, y);};
      },
    enableScrolling(){
      window.onscroll=function(){};
    }
  },
  mounted(){
    AOS.init();
  },
  components:{
    TopMenu,
    Modal,
    Dioram,
    VueperSlides,
    VueperSlide
  }
});