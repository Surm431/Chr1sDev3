module.exports = {
  listen(msg) {
    if (msg.content.toLowerCase() == `f`) {
      msg.react(`🇫`);
    }
    if (msg.content.match(/\bsimp\b/gi)) {
      msg.channel.send(
        `Therefore, my dear friends, flee from idolatry. - 1 Corinthians 10:14`
      );
    }
    if (
      msg.content.toLowerCase().includes(`ur mom`) ||
      msg.content.toLowerCase().includes(`your mom`)
    ) {
      msg.channel.send(`airhorn airhorn airhorn`, { tts: false });
    }
  },
};
