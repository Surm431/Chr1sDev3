module.exports = {
  name: "roles",
  permissions: 1,
  execute(msg) {
    const { MessageEmbed } = require("discord.js");
    let roles = "";
    msg.guild.roles.cache.map((r) =>
      r.name != "@everyone" ? (roles += `${r} `) : ""
    );
    const embed = new MessageEmbed()
      .setAuthor(`All Roles`)
      .setDescription(roles ? roles : "No Roles");
    msg.reply(embed);
  },
};