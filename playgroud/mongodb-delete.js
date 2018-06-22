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

  // deleteMany
  // db.collection('Todos').deleteMany({ text: 'test' }).then(result => {
  //   console.log('deleteMany Success', result.result);
  // }).catch(err => {
  //   console.log('deleteMany Fail', err);
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({ text: 'test' }).then(result => {
  //   console.log('deleteOne Success', result.result);
  // }).catch(err => {
  //   console.log('deleteOne Fail', err);
  // });

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({text: 'test'}).then(result=>{
  //   console.log('findOneAndDelete Success', result);
  // })

  db.collection('Users').deleteMany({ name: 'aaaa' });
  // findOneAndDelete by users
  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5b27c2191b700122fab6922e')
  }).then(result => {
    console.log('findOneAndDelete Success');
    console.log(JSON.stringify(result, undefined, 2));
  });

  // client.close();
});