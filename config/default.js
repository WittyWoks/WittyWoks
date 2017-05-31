const config = {
  knex: {
    client: 'postgresql',
    connection: {
<<<<<<< HEAD
      database: process.env.DATABASE_DB || require('../config/development.json').postgresql.DATABASE_DB,
      user: process.env.DATABASE_USER || require('../config/development.json').postgresql.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD || require('../config/development.json').postgresql.DATABASE_PASSWORD,
      host: process.env.DATABASE_HOST || require('../config/development.json').postgresql.DATABASE_HOST,
      port: 5432,
      ssl: true,
      url: process.env.DATABASE_URL || require('../config/development.json').postgresql.DATABASE_URL
<<<<<<< HEAD
     },
=======
=======
        database: "dd7hrl5p7gm49v",
        user: "dciguifphqlpec",
        password: "2448fb280f27d215544c2845eaa58e3c07ca19967aa06dc8cd2c6fe61273550a",
        host: "ec2-174-129-224-33.compute-1.amazonaws.com",
        port: 5432,
        ssl: true,
        url: 'postgres://dciguifphqlpec:2448fb280f27d215544c2845eaa58e3c07ca19967aa06dc8cd2c6fe61273550a@ec2-174-129-224-33.compute-1.amazonaws.com:5432/dd7hrl5p7gm49v?ssl=true&amp;sslfactory=org.postgresql.ssl.NonValidatingFactory'
>>>>>>> edits
    },
>>>>>>> Fixed OAUTH and google login, fixed database save of users
    pool: {
      min: 1,
      max: 2,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'db/migrations',
    },
    seeds: {
      directory: 'db/seeds',
    },
  }
}

module.exports = config
