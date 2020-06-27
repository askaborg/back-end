module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./database/wunderlist.db3"
    },
    seeds: {
      directory: "./database"
    },
    useNullAsDefault: true
  },
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./database/testing-wunderlist.db3"
    },
    seeds: {
      directory: "./database"
    },
    useNullAsDefault: true
  }
}
