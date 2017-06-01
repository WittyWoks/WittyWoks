
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('profiles', function (table) {
      table.increments('id').unsigned().primary();
      table.string('first', 100).nullable();
      table.string('last', 100).nullable();
      table.string('display', 100).nullable();
      table.string('email', 100).nullable().unique();
      table.string('phone', 100).nullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('auths', function(table) {
      table.increments('id').unsigned().primary();
      table.string('type', 8).notNullable();
      table.string('oauth_id', 30).nullable();
      table.string('password', 100).nullable();
      table.string('salt', 100).nullable();
      table.integer('profile_id').references('profiles.id');
    }),
    knex.schema.createTableIfNotExist('appliedJobs', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('job_id').references('jobs.id');
      table.string('status').notNullable();
      table.string('applied_id').unique().Nullable();
      table.integer('user_id').references('auths.oauth_id');
    }),
    knex.schema.createTableIfNotExist('jobs', function(table) {
      table.increments('id').unsigned().primary();
      table.string('title', 100).notNullable();
      table.string('description', 5000).Nullable();
      table.string('url',200).Nullable();
      table.string('top_ten',50).Nullable();
      table.integer('company_name').references('company.id');
    }),
    knex.schema.createTableIfNotExist('resume', function(table) {
      table.increments('id').unsigned().primary();
      table.string('location', 100).Nullable();
      table.string('skills', 5000).Nullable();
      table.string('keywords', 5000).Nullable();
      table.integer('user_id').references('auths.oauth_id');
    }),
    knex.schema.createTableIfNotExist('company', function(table) {
      table.increments('id').unsigned().primary();
      table.string('name', 100).Nullable();
      table.string('employees', 1000).Nullable();
      table.string('salary', 100).Nullable();
      table.string('worklife', 100).Nullable();
      table.string('culture', 100).Nullable();
      table.string('url', 100).Nullable();
      table.string('headline', 100).Nullable();
    }),

  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('auths'),
    knex.schema.dropTable('profiles'),
    knex.schema.dropTable('appliedJobs'),
    knex.schema.dropTable('jobs'),
    knex.schema.dropTable('resume'),
    knex.schema.dropTable('company'),

  ]);
};
