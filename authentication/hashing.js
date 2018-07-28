const { SHA256 } = require('crypto-js');

const message = 'I am test to test abc';
const hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

// 內容一樣 保持輸出的結果也是一樣的
// 驗證 其輸出結為一樣的

const data ={
  id: 333
}
const token ={
  data,
  hash: SHA256(JSON.stringify(data) + 'someSecret').toString()
}

// change data
token.data.id = 1;
token.hash = SHA256(JSON.stringify(token)).toString();

const resultHash = SHA256(JSON.stringify(token.data) + 'someSecret').toString();

if (resultHash === token.hash) {
  console.log('Data was not changed');
}else{
  console.log('Data was changed. Do to trust');
}