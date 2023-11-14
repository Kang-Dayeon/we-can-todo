const express = require('express')
const app = express()
const session = require('express-session')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./config/mysql')

// db 연결
const conn = db.init()

// 미들웨어
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// cors 전체로 허용
app.use(cors())

// 서버 시작하면 동작함
app.listen(8080, function(){
  console.log('listening on 8080')
})


// 이게 있어야 특정 폴더의 파일들 전송이 가능하다
app.use(express.static(path.join(__dirname, '../client/build')))

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.post('/api/login', (req, res) => {
  let userId = req.body.loginId
  let password = req.body.password
  const sql = "select * from users where userId = ? and password = ?"
  conn.query(sql,[userId,password], (err, result) => {
    if(err){
      throw console.log('query is not excuted:' + err)
    }
    if(result[0] !== undefined){
      console.log(result[0])
      req.session.userId = result[0].userId
      req.session.password = result[0].password
      req.session.name = result[0].name

      req.session.save(() => {
        res.redirect('/')
      })
    }
  })
})

// 리액트 라우터가 경로 처리 하게 하고 싶을 경우 = 서버에서 라우터 안만들었을때 => 최하단에 작성
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})