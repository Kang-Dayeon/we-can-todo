require('dotenv').config()
// ** library **
const express = require('express')
const multer = require('multer')
const fs = require('fs')
const bodyParser = require('body-parser')
const db = require('./config/mysql')
const path = require('path')
const cors = require('cors')

const app = express()
app.use(cors({credentials: true, origin: "http://localhost:3000"})) // cors 미들웨어

const conn = db.init()

const server = require('http').createServer(app)

// ** 미들웨어 **
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.post('/api/login', (req, res) => {
  let userId = req.body.loginId
  let password = req.body.password
  const sql = "SELECT * FROM users WHERE userId=? AND password=?"
  conn.query(sql,[userId,password], function(err, result){
    if(err) throw console.log("query is not excuted: " + err)
    else res.send(result)
  })
})

app.get('/', (req, res) => {
  const sql = "select * from todoList"
  conn.query(sql, function(err, result){
    if(err) console.log("query is not excuted: " + err)
    else res.send(result)
  })
})

server.listen(8080, () => {
  console.log('server is running on 8080')
})
