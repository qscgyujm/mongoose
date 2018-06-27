const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 111
}]


beforeEach(done => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
})

// 新增 Test POST
describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    const text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({
        text
      })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find({ text }).then(todos => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch(err => {
          done(e);
        })
      })
  });

  it('shout not create todo with invalid body data', done => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find().then(todos => {
          expect(todos.length).toBe(2);
          done();
        }).catch(err => done(err))
      });
  });
});

// 新增 Test GET
describe('GET /todos', () => {
  it('should get all todos', done => {
    request(app).get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });

  it('should return todo doc', done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done);
  });

  it('should return 404 if todo not found', done => {
    // make sure you get a 404 back
    const hexID = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexID}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object IDs', done => {
    // /todos/123

    request(app)
      .get('/todos/abc123')
      .expect(404)
      .end(done);
  });
});

// Delete Tesing
describe('Delete /todos/:id', () => {
  it('should remove a todo', done => {
    const hexID = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexID}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).toBe(hexID);
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        // queries database using findById toNotExist
        Todo.findById(hexID).then(todo => {
          expect(todo).toBeFalsy();
          // .toBeFalsy() 
          // https://facebook.github.io/jest/docs/en/expect.html#tobefalsy
          done();
        }).catch(err => done(err));
      });
  });

  it('should return 404 if todo not found', done => {
    const hexID = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${hexID}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is in valid', done => {

    request(app)
      .delete('/todos/abc123')
      .expect(404)
      .end(done);
  });
});

// Patch Testing 
describe('Pathc /todos/:id', () => {
  it('should update todo', done => {
    // grab id of frist item
    // update text, set completed true
    // 200
    // text is changed, completed is true, completedAt is number

    const hexID = todos[0]._id.toHexString();
    const newText = 'This should be the new text';

    request(app)
      .patch(`/todos/${hexID}`)
      .send({
        text: newText,
        completed: true,
      })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(newText);
        expect(res.body.todo.completed).toBe(true);
        expect( typeof res.body.todo.completedAt).toBe('number');
      })
      .end(done);
  });

  it('should clear completed when todo is not completed', done => {
    // grab id of second item
    // update text, set completed to false
    // 200
    // text is changed, completed is false, completedAt is null

    const hexID = todos[1]._id.toHexString();
    const newText = 'This should be the new text';

    request(app)
      .patch(`/todos/${hexID}`)
      .send({
        text: newText,
        completed: false,
      })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(newText);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBeFalsy();;
      })
      .end(done);

  });
});