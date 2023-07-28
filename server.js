require('dotenv').config()
// ** library **
const express = require('express')
const expressSession = require('express-session')
const multer = require('multer')
const fs = require('fs')
const bodyParser = require('body-parser')
const db = require('./config/mysql')
const path = require('path')
const cors = require('cors')

const app = express()
app.use(cors({credentials: true, origin: "*"})) // cors 미들웨어

const conn = db.init()

const server = require('http').createServer(app)

// ** 미들웨어 **
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// ** session **
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true
  })
)

app.get('/', (req, res) => {
  if(req.session){
    res.redirect('/')
  } else {
    res.redirect('/login')
    const sql = "select * from todoList"
    conn.query(sql, function(err, result){
      if(err) console.log("query is not excuted: " + err)
      else res.send(result)
    })
  }
})

app.post('/api/login', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  let userId = req.body.loginId
  let password = req.body.password
  const sql = "SELECT * FROM users WHERE userId=? AND password=?"
  conn.query(sql,[userId,password], function(err, result){
    if(err) {
      throw console.log('query is not excuted: ' + err)
    } else {
      res.session = {
        id: result[0].id,
        userId: result[0].userId,
        pw: result[0].password,
        name: result[0].name,
        authorized: true,
      }
    }
  })
})

server.listen(8080, () => {
  console.log('server is running on 8080')
})
