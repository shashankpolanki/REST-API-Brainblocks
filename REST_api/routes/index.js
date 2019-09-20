var express = require('express');
var router = express.Router();
const businessesController = require('../controllers').businesses

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/businesses', businessesController.list)
router.get('/api/businesses/:status/:offset/:limit', businessesController.list_filter)
router.get('/api/businesses/category/:category', businessesController.list_category)
router.get('/api/businesses/category/:category/:status/:offset/:limit', businessesController.list_category_filter)

router.get('/api/businesses/count/:status', businessesController.count_all)
router.get('/api/businesses/count/category/:category/:status', businessesController.count_category)

router.post('/api/businesses', businessesController.add)
router.delete('/api/businesses/:name', businessesController.destroy)

module.exports = router;
