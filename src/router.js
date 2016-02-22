import express from 'express';
import MainCtrl from './controller';
let router = express.Router();
router
  .get('/data/links', MainCtrl.getAllLinks)
  .get('/data/links/search', MainCtrl.searchLink)
  .get('/version', MainCtrl.getVersion)
  .post('/data/links', MainCtrl.saveLink);


module.exports = router;
