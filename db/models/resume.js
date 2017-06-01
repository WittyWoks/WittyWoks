const db = require('../');

const resume = db.Model.extend({
  tableName: 'resume',
  auths: function() {
    return this.hasMany('Auth');
  }
});

module.exports = db.model('resume', resume);
