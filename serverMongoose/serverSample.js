const mongoose = require('mongoose');

const db = 'mongodb://root:root@54.238.213.8:27017/Test';
mongoose.Promise = global.Promise;
mongoose.connect(db);

// modle為collection 但會變小寫+s
// 驗證
// http://mongoosejs.com/docs/validation.html
const Todo = mongoose.model('Test', {
  text: {
    type: String,
    required: true, // 必須存在
    minlength: 1, // 設定最小長度為1
    trim: true, // 移除空白空間
  },
  completed: {
    type: Boolean,
    default: false //預設值
  },
  completedAt: {
    type: Number,
    default: null,
  }
}); 



// const newTodo = new Todo({
//   text: 'Cook dinner'
// });

// newTodo.save().then(doc => {
//   console.log('Saved to todo', doc);
// }).catch(err => {
//   console.log('Unable to save todo');
// })


// 在model中沒有設定驗證需求，那會空值新增
// const otherTodo = new Todo({
//   text: 'Feed the cat',
//   completed: false,
//   completedAt: 1970
// });
// otherTodo.save().then(doc => {
//   console.log('save otherTodo');
//   console.log(JSON.stringify(doc, undefined, 2));
// }).catch(err => {
//   console.log('Unable to save otherTodo');
// });

// 驗證測試
const otherTodo = new Todo({
  text: '    Edit this video the cat   ',
});
otherTodo.save().then(doc => {
  console.log('save otherTodo');
  console.log(JSON.stringify(doc, undefined, 2));
}).catch(err => {
  console.log('Unable to save otherTodo');
});