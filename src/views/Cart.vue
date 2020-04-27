<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="购物车"></van-nav-bar>
    </div>
    <!--清空购物车-->
    <div class="card-title">
      <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
    </div>
    <div>
      <van-card
        v-for="(item,index) in cartInfo"
        :key="index"
        :num="item.count"
        :price="item.price*item.count | moneyFilter"
        :title="item.name"
        :thumb="item.image"
      >
        <template #footer>
          <van-stepper v-model="item.count" />
        </template>
      </van-card>
      <div class="totleMoney">
        商品总价:{{totalMoney | moneyFilter}}
      </div>
    </div>
  </div>
</template>

<script>
import {toMoney} from '@/filter/moneyFilter.js'
export default {
  data() {
    return {
      cartInfo: [], //购物车里的商品
      isEmpty: false //判断购物车是否为空
    };
  },
  created() {
    this.getCartInfo();
  },
   computed:{
           totalMoney(){
               let allMoney = 0 
               this.cartInfo.forEach((item,index)=>{
                   allMoney += item.price*item.count
               })
              localStorage.cartInfo = JSON.stringify(this.cartInfo)
            return allMoney
           }
       },
  filters:{
    moneyFilter(money){
      return toMoney(money);      
    }
  },
  methods: {
    getCartInfo() {
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo);
      }
      //打印到控制台查看效果
      console.log(" this.cartInfo:" + JSON.stringify(this.cartInfo));
      this.isEmpty = this.cartInfo.length > 0 ? true : false;
    },
    clearCart() {
      localStorage.removeItem("cartInfo");
      this.cartInfo = [];
    }
  }
};
</script>

<style scoped>
.card-title {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  text-align: right;
}
.totalMoeny{
    text-align: right;
    background-color: #fff;
    border-bottom:1px solid #E4E7ED;
    padding:5px;
}
</style>