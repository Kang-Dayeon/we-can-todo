const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
// ** router **
const authRouter = require('./route/auth')
const todoRouter = require('./route/todo')

// 미들웨어
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

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