module.exports = {
  name: "ranking",
  permissions: 1,
  category: "currency",
  description: "Wealth ranking",
  async execute(msg) {
    const { MessageEmbed } = require("discord.js");
    const SQLite = require("better-sqlite3");
    const sql = new SQLite("./src/databases/currency.sqlite");

    let people = sql
      .prepare("SELECT * FROM currency ORDER BY money DESC LIMIT 5")
      .all();

    const embed = new MessageEmbed().setTitle("Ranking").setColor("#47a8e8");

    // If I use guildMember it'll die cause if a user is no longer in the guild then `member` is undefined
    // async function getMember(id) {
    //   return await msg.guild.members.cache.get(id);
    // }
    let i = 1;
    for (let person of people) {
      // let member = await getMember(person.id);
      embed.addField(
        `#${i} ${msg.client.users.cache.get(person.id)?.username}`,
        `$${person.money}`,
        false
      );
      i++;
    }

    msg.reply({ embeds: [embed] });
  },
};
