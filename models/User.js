const mongoose = require('mongoose');
const bcrypt =require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')
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
// save  전에 일어나는 몽구스 메쏘드
userSchema.pre('save',function (next) {
    var user =this;
    // 패스워드변경시만 아래 실해되게하는 if문
    if(user.isModified('password')){

    // 비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) return next(err);
        bcrypt.hash(user.password,salt,function(err,hash){
            if(err) return next(err);
            user.password=hash
            next()
        })
    })
    }else{
        next()
    }
})
// 멧소드 만들때는 모델에서
userSchema.methods.comparePassword =function(plainPassword,cb){
    // 새롭게 들어온 확인용 비번을 암호화 시켜서 비교해야해 
    bcrypt.compare(plainPassword,this.password,function(err,isMatch){
        if(err) return cb(err);
        
        cb(null,isMatch)
    })
}
userSchema.methods.createToken =function(cb){
    var user =this;
    // jwt 생성하기
    var token= jwt.sign(user._id.toHexString(),'secretToken')
    user.token= token
    user.save(function(err,user){
        if(err)return cb(err);
        cb(null,user)
    })

}

// 모델로 스키마를 감싸주는 영역 
const User = mongoose.model('User',userSchema)

// 전역에서 쓸수잇게 하는 선언문
module.exports={User}