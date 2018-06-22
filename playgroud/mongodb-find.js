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


  // find all no query
  // db.collection('Todos').find().toArray().then(result => {
  // db.collection('Todos').find({completed: false}).toArray().then(result => {
  // db.collection('Todos').find({
  //   _id: new ObjectID('5b27bb3ca862e6178eefe318')
  //   // 在mongo中 _id是一個物件 
  // }).toArray().then(result => {
  //   console.log('To Todos');
  //   console.log(result);

  // }).catch(err => {
  //   console.log('Unable to fetch todos', err);
  // });


  db.collection('Todos').find().count().then(count => {
    console.log(`Todos Count:  ${count}`);
  }).catch(err => {
    console.log('Unable to fetch todos', err);
  });

  // client.close();
});