const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config/key')

const {User}  =require("./models/User")
const mongoose= require('mongoose')

// 바디페서로 클라이언트로 오는 정보를 디코딩, 인코딩 해준다.
// application /x-www ... 이걸 분석해서
app.use(bodyParser.urlencoded({extended:true}))
// json타입된걸 분석해서 가저오게
app.use(bodyParser.json())
app.use(cookieParser())


mongoose.connect(config.mongoURI).then(()=>console.log('MongDB connected'))
.catch(err=>console.log(err))

app.get('/', (req, res) => {
  res.send('Hello 안녕하dddd세요')
})

app.post('/register', (req, res) => {
    // 회원가입 할때 필요한 정보들을 client에서 가저오면 그것들을 데이터 베이스에넣는다
  // 인스턴스 생성
  const user =new User(req.body)
  // 몽고 db 메쏘드
  user.save((err,userInfo)=>{
    if(err) return res.json({succes:false,err})
    // 200은 성공햇다는 뜻
    return res.status(200).json({
      succes:true
    });
  })
})
// 로그인 
app.post('/login',(req,res)=>{
  //1. 요청된 이메일을 DB에 있는지 찾기
  User.findOne({email : req.body.email },(err,user)=>{
    if(!user){
      return res.json({
        loginSuccess:false,
        message:'제공된 이메일에 해당하는 유저가 없습니다.'
      });
    }
    //2. 요청된 이메일이 DB에 있다면 비번 매칭 확인
    user.comparePassword(req.body.password,(err,isMatch)=>{
      console.log('isMatch',isMatch)
      if(!isMatch)
      return res.json({
        loginSuccess:false,
        message:'비밀번호가 틀렸습니다.'
      });
      //3. 비밀번호 매칭 시 , 토큰생성 
      user.createToken((err,user)=>{
        if(err) return res.status(400).send(err);
        
        // 토큰을 저장한다 . 어디에?? 로컬 스토리지?? 쿠키 ?? 우리가 정할 수 있다. 여기선 쿠키에 하겠다.
        res.cookie("x_auth",user.token)
        .status(200)
        .json({loginSuccess:true,userId:user._id})
        
      })
    })
  })

})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})