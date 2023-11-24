const express = require('express')
const router = express.Router()
const db = require('../../config/mysql')

// db 연결
const conn = db.init()

// todo list 불러오기
router.post('/todolist', (req, res) => {
  let userID = req.body.userID
  let todoList = []

  conn.query("select * from users where UserID = ?", [userID], (err, result) => {
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

// add todo
router.post('/add-todo',(req, res) => {
  let todo = {
    content: req.body.content,
    completed: 0,
    userID: req.body.userID
  }

  // const findUser = "select * from users where UserID = ?"
  const insertTodo = "insert into todolist (content, completed, UserID) values(?,?,?)"

  conn.query(insertTodo,[todo.content, todo.completed, todo.userID], (err, result) => {
    if(err){
      throw console.log('add todo error : ' + err)
    } else {
      res.send(todo)
    }
  })
})

module.exports = router