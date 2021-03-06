module.exports = {
  name: "withdraw",
  permissions: 1,
  category: "currency",
  description: "Withdraw money from the bank into your wallet",
  async execute(msg, args) {
    const { MessageEmbed } = require("discord.js");
    const SQLite = require("better-sqlite3");
    const { doIExist } = require("./doIExist.ts");
    const bankDB = new SQLite("./src/databases/bank.sqlite");
    const walletDB = new SQLite("./src/databases/currency.sqlite");

    await doIExist(msg.author.id, undefined);

    let bank = bankDB
      .prepare("SELECT * FROM bank WHERE id = ?")
      .get(msg.author.id);
    let wallet = walletDB
      .prepare("SELECT * FROM currency WHERE id = ?")
      .get(msg.author.id);

    if (bank.money <= 0) return msg.reply("You have no money in the bank");
    if (!args[0]) return msg.reply("Enter a value to withdraw");
    if (Number.isNaN(Number(args[0]))) return msg.reply("That's not a number");
    if (Number(args[0]) <= 0) return msg.reply("Invalid amount");
    if (Number(args[0]) > bank.money)
      return msg.reply(
        `You don't have that much\nCurrent Bank Balance: ${bank.money}`
      );

    walletDB
      .prepare("INSERT OR REPLACE INTO currency (id, money) VALUES (?, ?);")
      .run(msg.author.id, wallet.money + Number(args[0]));
    bankDB
      .prepare("INSERT OR REPLACE INTO bank (id, money) VALUES (?, ?);")
      .run(msg.author.id, bank.money - Number(args[0]));

    bank = bankDB.prepare("SELECT * FROM bank WHERE id = ?").get(msg.author.id);
    wallet = walletDB
      .prepare("SELECT * FROM currency WHERE id = ?")
      .get(msg.author.id);

    const embed = new MessageEmbed()
      .setTitle("Current Balance")
      .addFields(
        { name: "Wallet", value: `$${wallet.money}`, inline: true },
        { name: "Bank", value: `$${bank.money}`, inline: true }
      )
      .setColor(msg.member.displayColor);

    msg.reply({ embeds: [embed] });
  },
};
