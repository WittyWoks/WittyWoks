const config = {
  knex: {
    client: 'postgresql',
    connection: {
        database: "dd7hrl5p7gm49v",
        user: "dciguifphqlpec",
        password: "2448fb280f27d215544c2845eaa58e3c07ca19967aa06dc8cd2c6fe61273550a",
        host: "ec2-174-129-224-33.compute-1.amazonaws.com",
        port: 5432,
        ssl: true,
        url: 'postgres://dciguifphqlpec:2448fb280f27d215544c2845eaa58e3c07ca19967aa06dc8cd2c6fe61273550a@ec2-174-129-224-33.compute-1.amazonaws.com:5432/dd7hrl5p7gm49v?ssl=true&amp;sslfactory=org.postgresql.ssl.NonValidatingFactory'
    },
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
