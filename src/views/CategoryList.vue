<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表"></van-nav-bar>
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="left-nav">
            <ul>
              <li
                @click="clickCategory(index,item.ID)"
                :class="{categoryActive:index==categoryIndex}"
                v-for="(item,index) in category"
                :key="index"
              >{{item.MALL_CATEGORY_NAME}}</li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active" sticky animated swipeable :ellipsis="false" @click="onClickCategorySub">
              <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
            </van-tabs>
          </div>
          <div id="list-div">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="到头了客官" @load="onLoad">
              <div class="list-item" v-for="(item,index) in goodList" :key="index" @click="goGoodsInfo(item.ID)">
                <div class="list-item-img">
                  <img :src="item.IMAGE1" alt="" width="100%" :onerror="errorImg"/>
                </div>
                <div class="list-item-text">
                  <div>{{item.NAME}}</div>
                  <div>￥{{item.ORI_PRICE | moneyFilter}}</div>
                </div>
              </div>
            </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
import {toMoney} from '@/filter/moneyFilter.js'
export default {
  data() {
    return {
      category: [],
      categoryIndex: 0,
      active: 0, //激活标签
      categorySub: [], //小类类别
      loading: false,//是否触发下拉加载
      finished: false,//上拉加载是否有数据
      refreshing: false,//是否触发下拉刷新
      page:1,//商品列表页数
      goodList:[],//商品信息
      categorySubId:'',//商品子分类id
      errorImg:'this.src="'+require('@/assets/images/errorimg.png')+'"',
    };
  },
  created() {
    this.getCategoryList();
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("left-nav").style.height = winHeight - 46-50 + "px";
    document.getElementById("list-div").style.height = winHeight - 90-50+ "px";
  },
  methods: {
    //获取大类数据
    getCategoryList() {
      axios({
        url: url.getCategoryList,
        method: "get"
      })
        .then(response => {
          console.log(response);
          if (response.data.code == 200 && response.data.message) {
            this.category = response.data.message;
            this.getCategorySubByCategoryID(this.category[0].ID);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickCategory(index, categoryId) {
      this.categoryIndex = index;
      this.page=1
      this.finished=false
      this.goodList=[]
      this.getCategorySubByCategoryID(categoryId);
    },
    //更据大类id找到对应的小类列表
    getCategorySubByCategoryID(categoryId) {
      axios({
        url: url.getCategorySubList,
        method: "post",
        data: { categoryId: categoryId }
      })
        .then(response => {
          console.log(response);
          if (response.data.code == 200 && response.data.message) {
            this.categorySub = response.data.message;
            this.active = 0;
            this.categorySubId=this.categorySub[0].ID
            this.onLoad()
          } else {
            Toast.fail("服务器出错");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取商品列表
    getGoodList(){
      axios({
        url:url.getGoodsListByCategorySubID,
        method:'post',
        data:{
          categorySubId:this.categorySubId,
          page:this.page
        }
      })
      .then(response=>{
        console.log(response)
        if(response.data.code==200&&response.data.message.length){
          console.log(response)
          this.page++
          this.goodList=this.goodList.concat(response.data.message)
        }else{
          this.finished=true
        }
        this.loading=false
      })
      .catch(error=>{
        console.log(error)
      })
    },
    //下拉刷新
    onRefresh(){
      setTimeout(()=>{
        this.refreshing=false
        this.finished=false
        this.goodList=[]
        this.page=1
        this.onLoad()
        this.refreshKey=false;
      },500)
    },
    //上拉加载
    onLoad() {
      setTimeout(() => {
        this.categorySubId=this.categorySubId?this.categorySubId:this.categorySub[0].ID
        this.getGoodList()
      }, 1000);
    },
    //点击获取小类里的商品
    onClickCategorySub(index,title){
      this.categorySubId=this.categorySub[index].ID
      console.log('categorySubId:'+this.categorySubId)
      this.goodList=[]
      this.finished=false
      this.page=1
      this.onLoad()
    },
    //跳转到商品详情页
    goGoodsInfo(id){
      this.$router.push({path:'./goods',query:{goodsId:id}})
    }
  },
  filters:{
  moneyFilter(money){
    return toMoney(money);
  }
}

};
</script>

<style scoped>
#left-nav {
  background-color: aliceblue;
}
#left-nav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive {
  background-color: #fff;
}
.tabCategorySub {
  text-align: center;
}
 .list-item{
        display: flex;
        flex-direction: row;
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
    }
    #list-div{
        overflow: scroll;
    }
    .list-item-img{
        flex:8;
    }
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }
   
</style>