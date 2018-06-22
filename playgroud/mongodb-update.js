// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// mongo的_id是透過時間來產生 因此為唯一值。
// ObjectID 是直接產生_id的方式。
// const obj = new ObjectID();
// console.log(obj);

const db = 'mongodb://root:root@54.238.213.8:27017/Test';
MongoClient.connect(db, (err, client) => {
  if (err) {
    return console.log('mongodb connect Error');
  }
  console.log('to MongoDB server');


  const db = client.db('Test');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5b27bb3ca862e6178eefe318')
  // }, {
  //     $set: {
  //       completed: true
  //     }
  //   }, {
  //     returnOriginal: false
  //     // 預設為true 回傳為未改變的結果
  //   }).then(result => {
  //     console.log('findOneAndUpdate Success', result);
  //   })

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5b27c017ada1461f996995bc')
  }, {
      $set: {
        name: 'xxxx'
      },
      $inc: {
        age: 1
      }
    }, {
      returnOriginal: false
      // 預設為true 回傳為未改變的結果
    }).then(result => {
      console.log('findOneAndUpdate Success', result);
    })

  // client.close();
});