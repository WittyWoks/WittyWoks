const db = require('../');

const appliedJobs = db.Model.extend({
  tableName: 'applied_jobs',
  user: function() {
    return this.belongsTo('profiles', 'id');
  }
});

module.exports = db.model('appliedJobs', appliedJobs);
