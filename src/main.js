import Vue from 'vue/dist/vue.esm.js'
import TopMenu from './components/TopMenu';
import Modal from './components/Modal';
import Dioram from './components/Dioram';

import 'vueperslides/dist/vueperslides.css'

import { VueperSlides, VueperSlide } from 'vueperslides'

import  "./scss/app.scss";

import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  data: {
    regFolded: true,
    showVideo1: false,
    showVideo2: false,
    swiperOption:{
      slidesPerView: 4,
      spaceBetween: 50,
      breakpoints: {
        // when window width is <= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        // when window width is <= 480px
        480: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        // when window width is <= 1024px
        1024: {
          slidesPerView: 3,
          spaceBetween: 30
        },
        // when window width is <= 640px
        1200: {
          slidesPerView: 4,
          spaceBetween: 50
        }
      },
      loop: true,
      loopFillGroupWithBlank: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }
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
    },


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