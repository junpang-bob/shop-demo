const mongoose=require('mongoose')
const db="mongodb://localhost/simle-db"
const glob=require('glob')//引入通配符
const {resolve}=require('path')
exports.initSchemas=()=>{
    //引入schema文件下的所有模型
    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}
exports.connect=()=>{
    //连接数据库
    mongoose.connect(db)
    //设置连接数据的最大连接数
    let maxConnectTimes=0
    //在进行其他事情时必须保证数据库连接正确，返回promise对象的事件监听
    return new Promise((resolve,reject)=>{
        mongoose.connection.on('disconnected',()=>{
            console.log('*****数据库断开******');
            if(maxConnectTimes<3){
            maxConnectTimes++
            mongoose.connect(db);
        }else{
            reject()
            throw new Error('数据库出现问题')
        }
        })
        //数据库出现错误时
        mongoose.connection.on('error',err=>{
            console.log('数据库出现错误');
            if(maxConnectTimes<3){
                maxConnectTimes++
                mongoose.connect(db);
            }else{
                reject()
                throw new Error('数据库出现问题')
            }
        })
        //链接打开的时候，一次监听
        mongoose.connection.once('open',()=>{
            console.log('数据库链接成功');
            resolve()
        })
    })
}