const BASEURL='https://www.fastmock.site/mock/85a745951d55ec2ee8fe1143c176b830/index/';
const LOCALURL="http://localhost:3000/"
const URL={
    getShopingMallInfo:BASEURL+'list',
    getGoodsInfo:BASEURL+'getGoodsInfo',
    registerUser:LOCALURL+'user/register',//注册接口
    login: LOCALURL+'user/login',//登录接口
    getDetailGoodsInfo:LOCALURL+'goods/getDetailGoodsInfo',//获取商品详情接口
    getCategoryList:LOCALURL+'goods/getCategoryList',//获取商品大类的接口
    getCategorySubList:LOCALURL+'goods/getCategorySubList',//获取商品小类的接口
    getGoodsListByCategorySubID:LOCALURL+'goods/getGoodsListByCategorySubID'//根据商品小类获取商品列表
}
module.exports=URL
