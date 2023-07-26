require('dotenv').config()
// ** server **
const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()

// ** Data **
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_ID,
  password: process.env.DB_PW,
  database: 'weCanTodo'
})

connection.connect();

connection.query('SELECT * form users', (error, rows, fields) => {
  if(error) throw error;
  console.log('user info is : ', rows)
})

connection.end();

const server = require('http').createServer(app)

app.use(cors()) // cors 미들웨어

app.get('/', (req, res) => {
  res.send({message: 'hello'})
})

server.listen(8080, () => {
  console.log('server is running on 8080')
})
