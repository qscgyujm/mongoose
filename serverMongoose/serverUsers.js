const mongoose = require('mongoose');


const db = 'mongodb://root:root@54.238.213.8:27017/Test';
mongoose.Promise = global.Promise;
mongoose.connect(db);

// modle為collection 但會變小寫+s
// 驗證
// http://mongoosejs.com/docs/validation.html
const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },

});

const user = new User({
  email: '    test@test.com    ',
});

user.save().then(doc => {
  console.log('User Saved', JSON.stringify(doc, undefined, 2));
}).catch(err => {
  console.log('Unable to save User', err);
});