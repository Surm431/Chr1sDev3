module.exports = {
  name: "help",
  execute(interaction) {
    const { MessageEmbed } = require("discord.js");
    let categories = ["info", "xp", "misc", "moderation"];
    let info, xp, misc, moderation;

    for (const category of categories) {
      switch (category) {
        case "info":
          info = interaction.client.commands.filter(
            (command) => command.category == category
          );
          break;
        case "xp":
          xp = interaction.client.commands.filter(
            (command) => command.category == category
          );
          break;
        case "misc":
          misc = interaction.client.commands.filter(
            (command) => command.category == category
          );
          break;
        case "moderation":
          moderation = interaction.client.commands.filter(
            (command) => command.category == category
          );
          break;
        default:
          break;
      }
    }
    let page = 1;
    const embed = new MessageEmbed().setAuthor("Info");
    for (const command of info) {
      let com = command[1];
      embed.addField(
        com.name,
        com.description ? com.description : "No Description",
        true
      );
    }
    interaction.reply(embed);
    interaction.fetchReply().then((message) => {
      message.react("◀");
      message.react("▶");
      const filter = (reaction, user) => {
        return (
          (reaction.emoji.name === "◀" || reaction.emoji.name === "▶") &&
          user.bot !== true
        );
      };
      const reactionCollector = message.createReactionCollector(filter, {
        time: 100000,
      });
      reactionCollector.on("collect", async (reaction, user) => {
        const userReactions = message.reactions.cache.filter((reaction) =>
          reaction.users.cache.has(user.id)
        );
        try {
          for (const reaction of userReactions.values()) {
            await reaction.users.remove(user.id);
          }
        } catch (error) {
          console.error("Failed to remove reactions.");
        }
        if (reaction.emoji.name === "◀" && page > 1) page--;
        if (reaction.emoji.name === "▶" && page < 4) page++;
        embed.fields = [];
        switch (page) {
          case 1:
            embed.setAuthor("Info");
            for (const command of info) {
              let com = command[1];
              embed.addField(
                com.name,
                com.description ? com.description : "No Description",
                true
              );
            }
            break;
          case 2:
            embed.setAuthor("Misc");
            for (const command of misc) {
              let com = command[1];
              embed.addField(
                com.name,
                com.description ? com.description : "No Description",
                true
              );
            }
            break;
          case 3:
            embed.setAuthor("XP");
            for (const command of xp) {
              let com = command[1];
              embed.addField(
                com.name,
                com.description ? com.description : "No Description",
                true
              );
            }
            break;
          case 4:
            embed.setAuthor("Moderation");
            for (const command of moderation) {
              let com = command[1];
              embed.addField(
                com.name,
                com.description ? com.description : "No Description",
                true
              );
            }
            break;
          default:
            break;
        }
        message.edit(embed);
      });
    });
  },
};
