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

// 로그인
app.post('/api/login', (req, res) => {
  let username = req.body.username
  let password = req.body.password
  let sendData = {
    userID: null,
    username: null,
    name: "",
    isLogin: false,
  }
  const sql = "select * from users where Username = ? and password = ?"
  conn.query(sql,[username,password], (err, result) => {
    if(err){
      throw console.log('query is not excuted:' + err)
    }
    if(result[0] !== undefined){
      sendData.userID = result[0].UserID
      sendData.isLogin = true
      sendData.name = result[0].name
      sendData.username = result[0].Username
      req.session.userID = sendData.userID
      req.session.name = sendData.name
      req.session.isLogin = sendData.isLogin
      req.session.username = sendData.username

      req.session.save(() => {
        res.send(sendData)
      })
    } else {
      conn.query("select * from users where Username = ?",[username], (err, result) => {
        if(err){
          throw console.log('아이디 찾기 에러:' + err)
        }
        if(result[0] !== undefined){
          console.log(result[0])
          sendData.name = result[0].name
          sendData.isLogin = false
          req.session.isLogin = sendData.isLogin
          req.session.username = sendData.username

          req.session.save(() => {
            res.send(sendData)
          })
        } else {
          req.session.save(() => {
            res.send(sendData)
          })
        }
      })
    }
  })
})

// 회원가입
app.post('/api/register', (req, res) => {
  let user = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  }

  const findUser = "select * from users where Username = ?"
  const insertQuery = "insert into users (Username, password, name) values(?, ?, ?)"

  conn.query(findUser,[user.username], (err, result) => {
    if(err){
      throw console.log('register err:' + err)
    }
    if(result[0] !== undefined){
      console.log("이미존재함")
      res.send(false)
    } else {
      conn.query(insertQuery, [user.username, user.password, user.name], (err, result) => {
        if(err){
          throw console.log('회원가입 실패:' + err)
        } else {
          res.send(true)
          // res.send('회원가입이 완료 되었습니다.')
        }
      })
    }
  })
})

// todo list 불러오기
app.post('/api/todolist', (req, res) => {
  let username = req.body.username
  let todoList = []

  conn.query("select * from users where Username = ?", [username], (err, result) => {
    if(err){
      throw console.log('todo list 불러오기 에러:' + err)
    }
    if(result[0] !== undefined){
      let userID = result[0].UserID
      conn.query("select * from todolist where UserID = ?", [userID], (err, result) => {
        todoList.push(...result)
        req.session.todoList = todoList
        req.session.save(() => {
          res.send(todoList)
        })
      })
    }
  })

})


// 리액트 라우터가 경로 처리 하게 하고 싶을 경우 = 서버에서 라우터 안만들었을때 => 최하단에 작성
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})