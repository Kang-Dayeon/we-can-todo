const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./config/mysql')
const session = require('express-session')
const mysqlSession = require('express-mysql-session')(session)

// db 연결
const conn = db.init()

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

const db_info = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_ID,
  password: process.env.DB_PW,
  database: 'todo'
}

const sessionStore = new mysqlSession(db_info)

app.use(session({
  key: "todoInfo",
  secret: "session_cookie_secret",
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
}))

sessionStore.onReady().then(() => {
  console.log('MySQLStore ready')
}).catch((error) => {
  console.error(error)
})

// 메인 진입시
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

// 로그인시
app.post('/api/login', (req, res) => {
  let userId = req.body.loginId
  let password = req.body.password
  let sendData = {
    name: "",
    todos: [],
    isLogin: false,
  }
  const sql = "select * from users where userId = ? and password = ?"
  conn.query(sql,[userId,password], (err, result) => {
    if(err){
      throw console.log('query is not excuted:' + err)
    }
    if(result[0] !== undefined){
      console.log(result[0])
      let id = result[0].id
      conn.query("select * from todolist where userId = ?", [id], (err, data) => {
        if(err){
          throw console.log('query is not excuted2:' + err)
        }
        console.log(data[0])
        sendData.isLogin = true
        sendData.todos.push(data[0])
        sendData.name = result[0].name
        req.session.name = sendData.name
        req.session.isLogin = sendData.isLogin
        req.session.todos = sendData.todos

        req.session.save(() => {
          res.send(sendData)
        })
      })

    }
  })
})

// 리액트 라우터가 경로 처리 하게 하고 싶을 경우 = 서버에서 라우터 안만들었을때 => 최하단에 작성
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})