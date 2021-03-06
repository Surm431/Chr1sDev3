module.exports = {
  name: "play",
  permission: 1,
  category: "voice",
  description: "Play music in vc",
  async execute(msg, args) {
    const Voice = require("../../voice/Voice");
    let distube = await Voice.getClient();

    const voiceChannel = msg.member.voice.channel;
    if (!voiceChannel) return msg.reply(`Please join a voice channel first!`);

    if (!args[0]) {
      msg.reply(`Missing song name`);
      return;
    }

    distube.play(msg, args.join(" "));
  },
};
