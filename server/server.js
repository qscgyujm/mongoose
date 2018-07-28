
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const Book = require('./models/Book');
const { authenticate } = require('./middleware/authenticate');

const { hihi, api, all } = require('./next/next');

// 建立express
const app = express();
// 讀取req 所需套件
app.use(bodyParser.json());
// bodyParser.json()可以讓 express 讀取json
app.use(bodyParser.urlencoded({ extended: false }));
// 

const port = 3000;

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
  });
});

// delete 
app.delete('/todos/:id', (req, res) => {
  // get the ID
  const id = req.params.id;

  // validate the ID -> not valid return 404
  if (!ObjectID.isValid(id)) return res.status(404).send();

  // remove by ID
  Todo.findByIdAndRemove(id).then(todo => {
    if (!todo) return res.status(404).send();
    res.send({ todo });
  }).catch(err => {
    res.status(400).send();
  });
});

// 修改
app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) return res.status(404).send();

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {
    $set: body
  }, {
      new: true
    }).then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({ todo });
    }).catch(err => {
      res.status(400).send();
    });

});


// Book API
// Get All
app.get('/book', (req, res) => {
  Book.find({}).then(books => {
    // console.log(books);
    res.send(books);
  })
})

// Get one by Id
app.get('/book/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      res.json(book);
    });
});

//  POST Book insert
app.post('/book', (req, res) => {
  const newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    category: req.body.category
  });

  newBook.save().then(book => {
    if (!book) {
      res.status(404).send();
    }
    res.json(book);
  });
});

// 新增第2種方法
app.post('/book2', (req, res) => {
  Book.create(req.body).then(book => {
    if (!book) return res.status(404).send();

    res.json(book);
  })
});

// 修改
app.put('/book/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title
    }
  }, {
      new: true
    })
    .then(book => {
      if (!book) {
        res.status(404).send();
      }
      res.json(book);
    });
})

app.delete('/book/:id', (req, res) => {
  Book.findByIdAndRemove(req.params.id)
    .then(book => {
      if (!book) return res.status(404).send();
      res.json(book);
    }).then(err => {
      res.send(err);
    });

})


// test next
// app.get('/next/api/hihi', (req, res) => {
//   hihi(req, res)
// });
// app.get('/next/api', (req, res, next) => {
//   api(req, res, next)
// });
// app.get('*', (req, res) => {
//   all(req, res)
// });


// POST /users
app.post('/users', (req, res) => {
  // console.log('test');

  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);

  user.save()
    .then(user => {
      // res.send(user);
      return user.generateAuthToken();
    })
    .then(token => {
      res
        .header('x-auth', token)
        .send(user)
    })
    .catch(err => {
      res.status(400).send(err);
    })
});



app.get('/users/me', authenticate, (req, res)=> {
  res.send(req.user);
});


// app.get('/users/me', (req, res) => {
//   const token = req.header('x-auth');
//   // console.log(token);

//   User.findByToken(token).then(user => {
//     if (!user) {
//       res.status(401).send();
//       // return Promise.reject();
//     }

//     res.send(user);
//   }).catch(e => {
//     res.status(401).send(e); 
//   });
//   // User.findByToken()
//   // console.log('a');
// });


app.listen(port, () => {

  console.log('started on port=', port);
})

module.exports = { app };