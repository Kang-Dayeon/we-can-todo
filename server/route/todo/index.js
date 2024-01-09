const express = require('express')
const router = express.Router()
const db = require('../../config/mysql')

// db 연결
const conn = db.init()

// 에러 핸들링 미들웨어
const handleErrors = (res, err, errorMessage) => {
  console.error(errorMessage, err);
  res.status(500).send({ error: errorMessage });
};

// 쿼리 실행 함수
const runQuery = (query, values, res, successMessage) => {
  conn.query(query, values, (err, result) => {
    if (err) {
      handleErrors(res, err, `Query execution error: ${err}`);
    } else {
      res.send(successMessage);
    }
  });
};

// todo list 불러오기
router.post('/todolist', (req, res) => {
  const userID = req.body.userID;

  conn.query('SELECT * FROM users WHERE UserID = ?', [userID], (err, result) => {
    if (err) {
      handleErrors(res, err, 'Todo list retrieval error');
    } else {
      const user = result[0];
      if (user) {
        conn.query('SELECT * FROM todolist WHERE UserID = ?', [user.UserID], (err, result) => {
          if (err) {
            handleErrors(res, err, 'Todo list retrieval error');
          } else {
            res.send(result);
          }
        });
      }
    }
  });
});

// add todo
router.post('/add-todo',(req, res) => {
  let todo = {
    content: req.body.content,
    completed: 0,
    userID: req.body.userID
  }

  // const findUser = "select * from users where UserID = ?"
  const insertTodo = "insert into todolist (content, completed, UserID) values(?,?,?)"

  runQuery(insertTodo, [todo.content, todo.completed, todo.userID], res, todo);
})

// edit todo
router.post('/edit-todo',(req, res) => {
  let todo = {
    TodoID: req.body.TodoID,
    content: req.body.content,
    completed: req.body.completed,
    userID: req.body.userID
  }

  const updateTodo = "update todolist set content = ? where TodoID = ?"

  runQuery(updateTodo, [todo.content, todo.TodoID], res, todo);
})

// remove todo
router.post('/remove-todo',(req, res) => {
  let TodoID = req.body.TodoID

  const deleteTodo = "delete from todolist where TodoID = ?"

  runQuery(deleteTodo, [TodoID], res, 'Todo removed successfully');
})

// toggle todo
router.post('/toggle-todo',(req, res) => {
  let todo = {
    TodoID: req.body.TodoID,
    completed: !req.body.completed,
  }

  const toggleTodo = "update todolist set completed = ? where TodoID = ?"

  runQuery(toggleTodo, [todo.completed, todo.TodoID], res, todo);
})

module.exports = router