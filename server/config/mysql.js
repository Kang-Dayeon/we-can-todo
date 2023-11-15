const express = require('express')
const app = express()
const session = require('express-session')
const mysqlSession = require('express-mysql-session')(session)
require('dotenv').config()

// ** Data **
const mysql = require('mysql2')
const db_info = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_ID,
  password: process.env.DB_PW,
  database: 'todo'
}

module.exports = {
  init: function(){
    return mysql.createConnection(db_info)
  },
  connect: function(conn){
    conn.connect(function(err){
      if(err) console.error("mysql connection error:" + err)
      else console.log("mysql is connected successfully!")
    })
  }
}
