const Router=require('koa-router')
const mongoose=require('mongoose')
let router=new Router()
router.get('/',async(ctx)=>{
    ctx.body="这是首页"
})
router.post('/register',async(ctx)=>{
    //将用户名密码存入数据库
    const User=mongoose.model('User') //取得model
    let newUser= new User(ctx.request.body)//将获取的前端数据封装进一个user对象
    await newUser.save().then(()=>{//将前端数据保存入数据库并反馈给前台
        ctx.body={
            code:200,
            message:'注册成功'
        }
    }).catch((error)=>{
        ctx.body={
            code:500,
            message:error
        }
    })
})
router.post('/login',async(ctx)=>{
    //得到前端传过来的数据
    let loginUser=ctx.request.body
    console.log(loginUser)
    let userName=loginUser.userName
    let password=loginUser.password
    //引入Userd的model
    const User=mongoose.model('User')
    //按照查找的用户名是否存在，若存在就比对密码
    await User.findOne({userName:userName}).exec().then(async(result)=>{
        console.log(result)
        if(result){
            let newUser=new User()//因为比对方法是实例方法，所以必须new出一个对象才能调用
            await newUser.comparePassword(password,result.password)
            .then((isMatch)=>{
                //返回对比结果
                ctx.body={code:200,message:isMatch}
            })
            .catch((error)=>{
                //出现异常返回
                console.log(error)
                ctx.body={code:500,message:error}
            })
        }else{
            ctx.body={ctx:200,message:'用户名不存在'}
        }
    }).catch(error=>{
        console.log(error)
        ctx.body={code:500,message:error}
    })
})
module.exports=router;