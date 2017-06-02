const db = require('../');

const Resume = db.Model.extend({
  tableName: 'Resume',
  auths: function() {
    return this.hasMany('Auth');
  }
});

module.exports = db.model('Resume', Resume);
