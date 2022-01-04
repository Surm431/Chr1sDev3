module.exports = {
  setup(client) {
    const fs = require("fs");

    // Logging
    const files = fs
      .readdirSync(`./src/logging`)
      .filter((file) => file.endsWith(".js"));
    for (const file of files) {
      const { log } = require(`../logging/${file}`);
      log(client);
    }
  },
};
