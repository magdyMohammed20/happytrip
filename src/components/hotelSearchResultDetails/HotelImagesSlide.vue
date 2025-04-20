<template>
    <el-dialog
    :modelValue="modelValue"
    @close="() => $emit('update:modelValue', false)"
    class=" bg-transparent dialog-swiper overflow-hidden swiper-dailog"
    :fullscreen="true"
    :close-icon="CloseBold"
  >
    <div class="w-full mt-12">
      <div class="text-center h-100 w-[50%] overflow-hidden relative mx-auto">
        <div class="swiper-container gallery-top">
          <div class="swiper-wrapper">
            <div
            v-for="(image,index) in images"
              class="swiper-slide"
              :key="index"
              :style="
                `background-image: url(${image})`
              "
            ></div>
          
          </div>
          <!-- Add Arrows -->
          <div class="swiper-button-next swiper-button-white button-next"></div>
          <div class="swiper-button-prev swiper-button-white button-prev"></div>
        </div>
      </div>
      <div class="text-center relative mx-auto overflow-hidden ">
        <div class="swiper-container gallery-thumbs h-[100px] w-[50%] overflow-hidden">
          <div class="swiper-wrapper">
            <div
            v-for="(image,index) in images"
              class="swiper-slide"
              :key="index"
              :style="
                `background-image: url(${image})`
              "
            ></div>
          </div>
          <div class="swiper-button-next swiper-button-white"></div>
          <div class="swiper-button-prev swiper-button-white"></div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>


<script>
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import { CloseBold } from '@element-plus/icons-vue'

export default {
    components : {
        CloseBold
    },
    props :{
        modelValue : {
            type : Boolean,
            default : false
        },
        images : {
            type : Array,
            default : []
        }
    },
mounted() {
    this.$nextTick(() => {
      var galleryThumbs = new Swiper(".gallery-thumbs", {
        spaceBetween: 10,
        slidesPerView: 5,
        activeClass: "swiper-slide-thumb-active",
        loopedSlides: 5, //looped slides should be the same
        // diable touch events
        allowTouchMove: false,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        on: {
          click: function () {
            var swiper = this;
            
            galleryTop.slideTo(swiper.clickedIndex);
          },
        },
      });
      var galleryTop = new Swiper(".gallery-top", {
                // diable touch events
         allowTouchMove: false,
        thumbs: {
          swiper: galleryThumbs,
        },
        navigation: {
          nextEl: ".swiper-button-next.button-next",
          prevEl: ".swiper-button-prev.button-prev",
        },
      });
    });

  }
};
</script>

<style lang="scss">
.swiper-dailog{
    margin: 0 ;
    i.el-dialog__close{
        width: 40px;
        height: 40px;
        svg{
            width: 40px;
            height: 40px;
        }
          color: #000;
    }
  }

.swiper-container {
    width: 100%;
    height: 300px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .swiper-slide {
    background-size: cover;
    background-position: center;
  }
  
  .gallery-top {
    height: 100%;
    width: 100%;
    .swiper-button {
      color : #000;
      cursor: pointer;
      display: block;
      position: absolute;
      top: 50%;
      right: 0;
      width: 27px;
      height: 44px;
      margin-top: -22px;
      z-index: 10;
      background-size: 27px 44px;
      background-position: center;
      background-repeat: no-repeat;
    }
    .swiper-button{
      color : #000;
      cursor: pointer;
      display: block;
      position: absolute;
      top: 50%;
      left:0;
      width: 27px;
      height: 44px;
      margin-top: -22px;
      z-index: 10;
      background-size: 27px 44px;
      background-position: center;
      background-repeat: no-repeat;
    }
    .swiper-slide {
      width: 100%;
      text-align: center;
      font-size: 18px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      background-size: cover;
      background-repeat: no-repeat;
      img {
  
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  
  .gallery-thumbs {
    height: 200px;
    box-sizing: border-box;
    padding: 10px 0;
    position: relative;
    .swiper-button-next , .swiper-button-prev {
      color : #000;
      cursor: pointer;
      display: block;
      position: absolute;
      top: 50%;
      width: 27px;
      height: 44px;
      margin-top: -22px;
      z-index: 10;
      background-size: 27px 44px;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
  
  .gallery-thumbs .swiper-slide {
    height: 100%;
    opacity: 1;
    align-self: end;
  }
  
  .gallery-thumbs .swiper-slide-thumb-active {
    opacity: 1;
  }
  </style>
  