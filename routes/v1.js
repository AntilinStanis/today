var express = require('express');
var router = express.Router();
const controller=require('../controller/insert.controller')
const passport=require('passport');
require('../middleware/passport')(passport);
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.post('/insertEmployee',controller.insertEmployee);
router.post('/insertTimesheet',controller.insertTimesheet);
router.get('/getStatus',controller.getStatus);
router.get('/getDate',controller.getDate);
router.get('/getTimesheet',controller.getTimesheet);
router.get('/getToken',controller.login);
router.get('/check', passport.authenticate('jwt', { session: false }),
function (req, res, next) {
  res.send('done  '+req.user.ename); 
//   next();
});
module.exports = router;
