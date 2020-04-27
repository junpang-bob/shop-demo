const mongoose=require('mongoose')//引入mongoose
const Scheam=mongoose.Schema//声明Scheam

const categorySubSchema=new Scheam({
    ID:{unique:true,type:String},
    MALL_CATEGORY_ID:{type:String},
    MALL_SUB_NAME:{type:String},
    COMMENTS:{type:String},
    SORT:{type:Number}
})

mongoose.model('CategorySub',categorySubSchema);