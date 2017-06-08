const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auth');
  },
  resumes: function() {
    return this.belongsTo('Resume', 'id');
  }
});

module.exports = db.model('Profile', Profile);
