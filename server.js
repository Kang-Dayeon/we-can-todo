require('dotenv').config()
// ** library **
const express = require('express')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
// const multer = require('multer')
// const fs = require('fs')
const bodyParser = require('body-parser')
const db = require('./config/mysql')
// const path = require('path')
const cors = require('cors')

const app = express()
app.use(cors({credentials: true, origin: "*"})) // cors 미들웨어

const conn = db.init()

const server = require('http').createServer(app)

// ** 미들웨어 **
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// ** session **
const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_ID,
  password: process.env.DB_PW,
  database: 'todo'
}
const sessionStore = new MySQLStore(options)

app.use(session({
    secret: "my key",
    resave: false,
    saveUninitialized: true,
    store: sessionStore
  })
)

app.get('/', (req, res) => {
  if(req.session.isLogined){
    res.redirect('/')
    const sql = "select * from todoList"
    conn.query(sql, function(err, result){
      if(err) console.log("query is not excuted: " + err)
      else res.send(result)
    })
  } else {
    res.redirect('/login')
  }
})

app.post('/api/login', (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*")
  let userId = req.body.loginId
  let password = req.body.password
  const sql = "SELECT * FROM users WHERE userId=? AND password=?"
  conn.query(sql,[userId,password], function(err, result){
    if(err) {
      throw console.log('query is not excuted: ' + err)
    }
    if(result[0] !== undefined){
      req.session.userId = result[0].userId
      req.session.isLogined =  true
      req.session.save(function(){
        res.redirect('/')
      })
    }
  })
})

server.listen(8080, () => {
  console.log('server is running on 8080')
})
