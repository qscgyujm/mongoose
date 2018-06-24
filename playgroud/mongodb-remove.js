const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// removeAll
// Todo.remove({}).then(result => {
//   console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findOneAndRemove({
//   _id: '5b2f955513d630702958d5d6'
// }).then(todo => {
//   console.log(todo);
// });

// Todo.findByIdAndRemove
Todo.findByIdAndRemove('5b2f955513d630702958d5d6').then(todo => {
  console.log(todo);
});