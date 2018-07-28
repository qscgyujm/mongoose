function hihi(req, res) {
  console.log('hihi', req.url);
  res.send('hihi');
}


function api(req, res, next) {
  console.log('api', req.url);
  next();
}

function all(req, res) {
  console.log('all', req.url);
  res.send('all')
}

module.exports = {
  hihi,
  api,
  all
}

// api的順序 
// 有next 會往下跑 
// * 全部