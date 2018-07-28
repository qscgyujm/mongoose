const bcrypt = require('bcryptjs');

const password = 'test123';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

const hashPassword = '$2a$10$4GlvYlPWHBLchpPyh/rBku1nIcl6Cx/FjTHL5wIwhJcLej3mEIKKG';

bcrypt.compare(password, hashPassword, (err, res) => {
  console.log(res);
});