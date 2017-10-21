var express = require('express');

var router = express.Router();

module.exports = function(app) {

  var helpers = app.get('helpers');
  var db = app.get('db');
  var filters = app.get('filters');
  
  router.get('/form', function(req, res) {
    res.render('donate.html', {})
  });

  router.post('/form', filters.authRequired(), function(req, res) {
    var data = req.body;
    data.creator_id = req.user.get('id');
    var organization = db.Organization.build(data);
    organization.save().then(function() {
      res.redirect('/donate');
    }).catch(function(e) {
      console.log(e);
      res.redirect('back');
    })
  });

  app.use('/donate', router);
};