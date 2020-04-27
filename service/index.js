const Koa=require('koa');
const Router=require('koa-router');
const {connect,initSchemas} =require('./database/init.js')
const mongoose=require('mongoose')
const bodyparser=require('koa-bodyparser')
const cors= require('koa2-cors')
const app=new Koa();
//先处理post请求
app.use(bodyparser())
//后支持跨域请求
app.use(cors())

//引入user.js模块
let user=require('./appApi/user.js')
let goods=require('./appApi/goods.js')
//装载所有子路由
let router=new Router();
router.use('/user',user.routes())
router.use('/goods',goods.routes())
//加载子路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

app.use(async(ctx)=>{
    ctx.body='<h1>hello Koa2</h1>'
})
app.listen(3000,()=>{
    console.log('cheng');
})
//立即执行
;(async ()=>{
    connect()
    initSchemas()
})()