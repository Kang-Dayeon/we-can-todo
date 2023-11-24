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