const mongoose = require('mongoose');

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

module.exports = { Todo };