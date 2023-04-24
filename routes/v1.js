var express = require('express');
var router = express.Router();
const controller=require('../controller/insert.controller')
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.post('/insertTimesheet',controller.insertTimesheet);
router.get('/getStatus',controller.getStatus);
module.exports = router;
