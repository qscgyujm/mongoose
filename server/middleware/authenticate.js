const { User } = require('../models/user');

const authenticate = (req, res, next) => {
  const token = req.header('x-auth');
  // console.log(token);

  User.findByToken(token).then(user => {
    if (!user) {
      res.status(401).send();
      // return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
    // res.send(user);
  }).catch(e => {
    res.status(401).send(e);
  });
};

module.exports = {
  authenticate,
}