const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength:50
    },
    email:{
        type: String,
        trim:true,
        unique:1
    },
    password:{
        type: String,
        minlength:5
    },
    lastname:{
        type: String,
        maxlength:50
    },
    role:{
        type: Number,
        default:0
    },
    image:String,
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    }
})
// 모델로 스키마를 감싸주는 영역 
const User = mongoose.model('User',userSchema)

// 전역에서 쓸수잇게 하는 선언문
module.exports={User}