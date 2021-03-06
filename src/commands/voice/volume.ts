module.exports = {
  name: "volume",
  permission: 1,
  category: "voice",
  description: "Adjust the music volume 0-100",
  async execute(msg, args) {
    const Voice = require("../../voice/Voice");
    let distube = await Voice.getClient();

    const voiceChannel = msg.member.voice.channel;
    if (!voiceChannel) return msg.reply(`Please join a voice channel first!`);
    if (!args[0]) {
      msg.reply("Missing volume amount");
      return;
    } else if (Number.isNaN(Number(args[0]))) {
      msg.reply("Supplied amount is not a number");
      return;
    }
    distube.setVolume(msg, Number(args[0]));
  },
};
