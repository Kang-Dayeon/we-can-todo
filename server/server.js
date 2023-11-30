const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
// ** passport **
const passport = require('passport')
const session = require('express-session')
const mySQLStore = require('express-mysql-session')(session)
// ** router **
const authRouter = require('./route/auth')
const todoRouter = require('./route/todo')

require('dotenv').config()

// 미들웨어
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
// passport
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new mySQLStore({
      host: process.env.DB_HOST,
      user: process.env.DB_ID,
      password: process.env.DB_PW,
      database: 'todo'
    })
  })
)
app.use(passport.initialize()) // passport 사용 하도록 세팅
app.use(passport.session()) // passport 사용시 session 사용

// cors 전체로 허용
app.use(cors())

// 이게 있어야 특정 폴더의 파일들 전송이 가능하다
app.use(express.static(path.join(__dirname, '../client/build')))

// 서버 시작하면 동작함
app.listen(8080, function(){
  console.log('listening on 8080')
})

// 메인 진입시
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

// ** routers **
// auth
app.use('/auth', authRouter)
// todo
app.use('/todo', todoRouter)

// 리액트 라우터가 경로 처리 하게 하고 싶을 경우 = 서버에서 라우터 안만들었을때 => 최하단에 작성
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})