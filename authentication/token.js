const jwt = require('jsonwebtoken');

const data={
  id: 99
}

const token = jwt.sign(data, 'abcdefg');
console.log(token);

const decoded = jwt.verify(token, 'abcdefg');
console.log('decoded', decoded);