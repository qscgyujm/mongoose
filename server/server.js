const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();
app.use(bodyParser.json());

// 新增 到 mongo DB
app.post('/todos', (req, res) => {
  // console.log(req.body);

  const todo = new Todo({
    text: req.body.text
  });

  todo.save().then(doc => {
    // console.log(doc);
    // res.send(doc);
    res.status(200)
      .send(doc);
  }).catch(e => {
    res.status(400)
      .send(e);
  });
});

// 從 mongoDB 取的資料
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.status(200).send({ todos });
  }).catch(err => {
    res.status(400).send(e);
  })
})

// Get /todos/:id
app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then(todo => {
    if (!todo) return res.status(404).send();

    console.log(todo);
    res.send({ todo });
  }).catch(e => {
    res.status(400).send();
  })

  // valid id user isvalid
  // 404
  // findById
  // success
  // if todo
  // if no todo
  // error
  // 400
})

app.listen(3000, () => {

  console.log('started on port 3000');
})

module.exports = { app };