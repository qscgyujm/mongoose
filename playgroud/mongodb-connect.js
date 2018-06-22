// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// mongo的_id是透過時間來產生 因此為唯一值。
// ObjectID 是直接產生_id的方式。
const obj = new ObjectID();
console.log(obj);

const db = 'mongodb://root:root@54.238.213.8:27017/Test';
MongoClient.connect(db, (err, client) => {
  if (err) {
    return console.log('mongodb connect Error');
  }
  console.log('to MongoDB server');


  const db = client.db('Test');

  // db.collection('Todos').insertOne({
  //   text: 'just a test',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   // console.log(result);
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.collection('Users').insertOne({
    // _id: '...', _id可以自行建立。
    name: 'test',
    age: 100,
    location: 'Taiwan'
  }).then(result => {
    console.log(result.ops[0]._id.getTimestamp());
    console.log(result.ops);
  }).catch(err => {
    if (err) {
      console.log('Unable to insert todo', err);
    }
  })

  client.close();
});