// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./database/wunderlist.db3"
    },
    useNullAsDefault: true
  }
}
