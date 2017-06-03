const db = require('../');

const appliedJobs = db.Model.extend({
  tableName: 'appliedJobs',
  auths: function() {
    return this.belongsTo('auth', 'oauth_id');
  }
});

module.exports = db.model('appliedJobs', appliedJobs);
