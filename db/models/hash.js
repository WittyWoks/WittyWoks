const db = require('../');

const Hash = db.Model.extend({
  tableName: 'hash_table',
});

module.exports = db.model('Hash', Hash);
