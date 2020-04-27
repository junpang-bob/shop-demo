<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    </div>
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" width="100%" />
    </div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格：￥{{goodsInfo.PRESENT_PRICE | moneyFilter}}</div>
    <div>
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评论">正在制作中</van-tab>
      </van-tabs>
    </div>
    <div class="goods-bottom">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="购物车" />
        <van-goods-action-icon icon="shop-o" text="店铺" />
        <van-goods-action-button type="warning" text="加入购物车" @click=" addGoodsToCart"/>
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  data() {
    return {
      goodsId: '',
      goodsInfo: {}
    };
  },
  created() {
    this.goodsId =this.$route.query.goodsId
    console.log(this.goodsId)
    this.getInfo();
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getInfo() {
      axios({
        url: url.getDetailGoodsInfo,
        method: "post",
        data: {
          goodsId: this.goodsId
        }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.goodsInfo = response.data.message;
          } else {
            Toast.fail("服务器出错");
          }
        })
        .catch(err => {
          Toast.fail("服务器出错");
        });
    },
    addGoodsToCart() {
      let cartInfo = localStorage.cartInfo
        ? JSON.parse(localStorage.cartInfo)
        : [];
      let isHaveGoods=cartInfo.find(cart=>cart.goodsId==this.goodsId)
      if(!isHaveGoods){
        let newGoodsInfo={
          goodsId:this.goodsInfo.ID,
          name:this.goodsInfo.NAME,
          price:this.goodsInfo.PRESENT_PRICE,
          image:this.goodsInfo.IMAGE1,
          count:1
        }
        console.log(newGoodsInfo)
        cartInfo.push(newGoodsInfo)
        localStorage.cartInfo=JSON.stringify(cartInfo)
        Toast.success('添加成功')
      }else{
        Toast.success('已有此商品')
      }
      this.$router.push({path:'./cart'})
    }
  }
};
</script>

<style scoped>
.detail {
  font-size: 0px;
}
.goods-name {
  background-color: #fff;
}
.goods-price {
  background-color: #fff;
}
.goods-bottom {
  position: fixed;
  bottom: 0px;
}
</style>