<template>
  <div>
    <div class="search-bar">
      <van-row class="text-row">
        <van-col span="3">
          <img :src="locationSrc" class="location-icon" />
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input" />
        </van-col>
        <van-col span="5">
          <div class="search-button">
          <van-button size="mini">查找</van-button>
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- 轮播图 -->
    <div class="swiper-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" alt="" width="100%">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 首页导航 -->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" width="90%">
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!--Banner -->
    <div>
      <img v-lazy="adBanner" width="100%">
    </div>
    <!-- 商品推荐 -->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options="swiperOptions">
        <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
          <div class="recommend-item">
            <img :src="item.image" alt="" width="80%">
            <div>{{item.goodsName}}</div>
            <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
          </div>
        </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- 楼层 -->
    <floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
    <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
    <floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component>
    <!-- 热卖部分 -->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <!-- list组件 -->
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
              <goods-info-component :goodsImage="item.image" :goodsPrice="item.price" :goodsName="item.name"></goods-info-component>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {toMoney} from '../filter/moneyFilter.js'
import 'swiper/css/swiper.css'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import floorComponent from '../components/component/FloorComponent'
import goodsInfoComponent from '../components/component/goodsInfoComponent'
import url from '@/serviceAPI.config.js'
export default {
  data() {
    return {
      swiperOptions:{
        slidesPerView:3
      },
      locationSrc: require("../assets/images/location.png"),
      bannerPicArray: [],
      category:[],
      adBanner:'',
      recommendGoods:[],
      floor1:[],
      floor2:[],
      floor3:[],
      floorName:{},
      hotGoods:[]//热卖商品
    }
},
//使用过滤器进行数据格式的改变
filters:{
  moneyFilter(money){
    return toMoney(money);
  }
},
components: {
    Swiper,
    SwiperSlide,
    floorComponent,
    goodsInfoComponent
  },
directives: {
    swiper: directive
  },
created(){
  axios({
    url:url.getShopingMallInfo,
    method:'get'
  }).then(response=>{
    console.log(response);
    if(response.status==200){
      this.category=response.data.data.category;
      this.adBanner=response.data.data.advertesPicture.PICTURE_ADDRESS;
      this.bannerPicArray=response.data.data.slides;
      this.recommendGoods=response.data.data.recommend;
      this.floor1=response.data.data.floor1;
      this.floor2=response.data.data.floor2;
      this.floor3=response.data.data.floor3;
      this.floorName=response.data.data.floorName;
      this.hotGoods=response.data.data.hotGoods;
    }
  }).catch(error=>{
    console.log(error);
  })
}
}
</script>

<style scoped>
.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
 }
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid #fff;
  background-color: #e5017d;
  color: #fff;
}
.location-icon {
  width: 80%;
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}
.search-button{
  margin-left: 0.3rem;
}
.swiper-area{
  clear: both;
  max-height: 15rem;
  overflow: hidden;
}
.type-bar{
  background-color: #fff;
  margin: 0 .3rem .3rem .3rem;
  border-radius: .3rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div{
        padding:.3rem;
        font-size:12px;
        text-align: center;
        flex:1;
    }
.recommend-area{
  background-color: #fff;
  margin-top: .3rem;
}
.recommend-title{
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: .2rem;
  color: #e5017d;
}
.recommend-body{
  border-bottom: 1px solid #eee;
}
.recommend-item{
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
.hot-area{
      text-align: center;
      font-size:14px;
      height: 1.8rem;
      line-height:1.8rem;
  }
</style>