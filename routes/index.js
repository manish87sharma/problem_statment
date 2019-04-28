var express = require('express');
var router = express.Router();
var serve = require('../serve');

router.get('/', function (req, res, next) {
   res.render('index', {title: 'Express'});
})
router.get('/api/csv_file', function (req, res, next) {

   let serveObj = new serve();
   let jsonData = serveObj.executeRequest(req);
   jsonData.then((result) => {
      res.setHeader('Content-disposition', 'attachment; filename=testing.csv');
      res.set('Content-Type', 'text/csv');
      res.status(200).send(result);
   }).catch((err) => {
      console.error("error is", err);
      res.status(500).send(err);
   })
});

module.exports = router;
