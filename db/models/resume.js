const db = require('../');

const Resume = db.Model.extend({
  tableName: 'resume',
  profile: function() {
    return this.belongsTo('profile', 'resume_id');
  }
});

module.exports = db.model('Resume', Resume);
