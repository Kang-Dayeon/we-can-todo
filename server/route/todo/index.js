const express = require('express')
const router = express.Router()
const db = require('../../config/mysql')

// db 연결
const conn = db.init()

// todo list 불러오기
router.post('/todolist', (req, res) => {
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

module.exports = router