module.exports = function(app) {
  require('./controllers/cellar_controller')(app);
  require('./directives/cellar_form_directive')(app);
};
