require('dotenv').config()
// ** library **
const express = require('express')
const multer = require('multer')
const fs = require('fs')
const bodyPerser = require('body-parser')
const db = require('./config/mysql')
const path = require('path')
const cors = require('cors')

const app = express()
const conn = db.init()

const server = require('http').createServer(app)

// ** 미들웨어 **
app.use(bodyPerser.json())
app.use(bodyPerser.urlencoded({extended: false}))

app.use(cors()) // cors 미들웨어

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
