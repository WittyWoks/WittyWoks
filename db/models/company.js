const db = require('../');

const company = db.Model.extend({
  tableName: 'company',
  auths: function() {
    return this.hasMany('Auth');
  }
});

module.exports = db.model('company', company);
