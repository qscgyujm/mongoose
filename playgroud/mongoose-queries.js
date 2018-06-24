const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

const id = '5b2f37bac9b4a253fcc83f67';

if (!ObjectID.isValid(id)) {
  console.log('ID not valid ');
}

// Todo.find({
//   _id: id
// }).then(todos => {
//   console.log('Todos:', todos);
// });

// Todo.findOne({
//   _id: id
// }).then(todo => {
//   console.log('Todo:', todo);
// });

Todo.findById(id).then(todo => {
  if (!todo) {
    return console.log('ID not found');
  }
  console.log('Todo by id:', todo);
}).catch(e => console.log(e));

User.findById('5b2cd5a9737a08a9fca15a8d').then((user) => {
  if (!user) {
    return console.log('Unable to find user');
  }

  console.log('User by id:', JSON.stringify(user, undefined, 2));
}).catch(e => {
  console.log(e);
})