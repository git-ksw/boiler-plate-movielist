const express = require('express')
const app = express()
const port = 5000

const mongoose= require('mongoose')

mongoose.connect('mongodb+srv://wook:asd123@wookyoutubeclone.xuxjt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(()=>console.log('MongDB connected'))
.catch(err=>console.log(err))

app.get('/', (req, res) => {
  res.send('Hello 안녕하세요')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})