<template>
  <div>
    <div class="goods">
      <div class="goods-image">
        <img v-lazy="goodsImage" alt />
      </div>
      <div class="info">
      <div class="goods-name">{{goodsName}}</div>
      <div class="goods-price">￥{{goodsPrice | goodsPriceFilter}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {toMoney} from '@/filter/moneyFilter.js';
export default {
  props: ["goodsImage", "goodsName", "goodsPrice"],
  filters:{
      goodsPriceFilter:function(price){
          return toMoney(price);
      }
  }
};
</script>

<style scoped>

.goods-image img{
    width: 80%;
}
.goods-name {
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goods-price{
    font-size: 20px;
}
</style>