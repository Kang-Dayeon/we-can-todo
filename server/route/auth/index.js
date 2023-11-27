const express = require('express')
const router = express.Router()
const db = require('../../config/mysql')

// db 연결
const conn = db.init()

// 로그인
router.post('/login', (req, res) => {
  let username = req.body.username
  let password = req.body.password
  let sendData = {
    userID: null,
    username: '',
    name: "",
    isLogin: false,
    failLogin: ''
  }

  const sql = "select * from users where Username = ?"

  conn.query(sql,[username], (err, result) => {
    if(err){
      throw console.log('로그인 에러 :' + err)
    }
    if(result[0] !== undefined){
      console.log("?")
      if(result[0].password === password){
        sendData.userID = result[0].UserID
        sendData.isLogin = true
        sendData.name = result[0].name
        sendData.username = result[0].Username
        sendData.failLogin = ""

        res.send(sendData)
      } else{
        sendData.failLogin = "비밀번호가 일치하지 않습니다"
        res.send(sendData)
      }
    } else {
      sendData.failLogin = "존재하지 않는 아이디 입니다"
      res.send(sendData)
    }
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