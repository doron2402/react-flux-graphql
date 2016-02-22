import DBClient from './db';
let pkg = require('../package.json');

class MainCtrl {
  getAllLinks(req, res) {

    DBClient.db.collection('links').find({}).toArray((err, links) => {
      if (err){
        throw err;
      }
      return res.json(links);
    });
  }

  getVersion(req, res){
    return res.json({
      code: 'ok',
      version: pkg.version,
      name: pkg.name
    });
  }

  saveLink(req, res, next){
    console.log(req.body);
    DBClient.insert(req.body, 'links', (err, result) => {
      if (err){
        return next(err);
      }
      return res.json({code: 'ok', body: result});
    });
  }

  searchLink(req, res, next) {
    let {param, value} = req.query;
    if (!param || !value) {
      return next('Missing Query Params');
    }
    let query = {};
    query[param] = value;
    DBClient.findOne(query, 'links', (err, result) => {
      if (err){
        return next(err);
      }
      return res.json({code: 'ok', body: result});
    });
  }
}

export default new MainCtrl();
