const express = require('express')
const router = express.Router()
const db = require('../../config/mysql')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// db 연결
const conn = db.init()

// login data
let sendData = {
  userID: null,
  username: '',
  name: '',
  isLogin: false,
  failLogin: ''
}

router.post('/login',(req, res) => {
  passport.authenticate(
    'local',
    (err, user) => {
      if(err){ return console.log('login err :' + err) }

      let json = JSON.parse(JSON.stringify(user))
      if(user){
        req.logIn(user, (err) => {
          if(err) {return console.log(err)}
          return res.send(json)
        })
      } else {
        console.log("login fail")

        res.send(sendData)
      }
    })(req, res)
})

// passport가 session에 사용자의 id를 저장할 수 있도록 해줌
// 로그인 했을때 딱 한번임
passport.serializeUser((user, done) => {
  console.log('SreializeUser', user)
  done(null, user.username)
})

// 로그인에 성공하고 페이지에 방문할때마다 호출됨
// session에 저장된 user id를 기준으로 DB에서 데이터를 검색하고 호출
passport.deserializeUser((username, done) => {
  console.log('DeserializeUser', username)

  const sql = "select * from users where Username = ?"

  conn.query(sql,[username], (err, result) => {
    if(err){
      throw console.log('session err :' + err)
    }

    let user = result[0]
    if(result[0] !== undefined){
      done(null, user)
    } else {
      done(err)
    }
  })
})

passport.use(new LocalStrategy(
  (username, password, done) => {
    const sql = "select * from users where Username = ?"

    conn.query(sql,[username], (err, result) => {
      if(err){
        return done(err)
      }
      if(result[0] !== undefined){
        if(result[0].password === password){
          sendData.userID = result[0].UserID
          sendData.isLogin = true
          sendData.name = result[0].name
          sendData.username = result[0].Username
          sendData.failLogin = ""

          done(null, sendData)
        } else{
          sendData.userID = null
          sendData.isLogin = false
          sendData.name = ''
          sendData.username = ''
          sendData.failLogin = "비밀번호가 일치하지 않습니다"
          done(null, false, {message: "비밀번호가 일치하지 않습니다"})
        }
      } else {
        sendData.userID = null
        sendData.isLogin = false
        sendData.name = ''
        sendData.username = ''
        sendData.failLogin = "존재하지 않는 아이디 입니다"
        done(null, false, {message: "존재하지 않는 아이디 입니다"})
      }
    })
  }
))

// 로그아웃
router.get('/logout', (req, res, next) => {
  console.log("logout")
  req.logout((err) => {
    if(err) { return next(err) }
    res.redirect('/')
  })
})

// 회원가입
router.post('/register', (req, res) => {
  let user = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  }

  const findUser = "select * from users where Username = ?"
  const insertUser = "insert into users (Username, password, name) values(?, ?, ?)"

  conn.query(findUser,[user.username], (err, result) => {
    if(err){
      throw console.log('register err:' + err)
    }
    if(result[0] !== undefined){
      console.log("이미존재함")
      res.send(false)
    } else {
      conn.query(insertUser, [user.username, user.password, user.name], (err, result) => {
        if(err){
          throw console.log('회원가입 실패:' + err)
        } else {
          res.send(true)
        }
      })
    }
  })
})

module.exports = router