const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const config = require('./config/key')

const {User}  =require("./models/User")
const mongoose= require('mongoose')

// 바디페서로 클라이언트로 오는 정보를 디코딩, 인코딩 해준다.
// application /x-www ... 이걸 분석해서
app.use(bodyParser.urlencoded({extended:true}))
// json타입된걸 분석해서 가저오게
app.use(bodyParser.json())


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
    })
  })
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})