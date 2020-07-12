const { Command } = require('discord.js-commando');
//MADE BY CTK
module.exports = class LoopCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'loop',
      group: 'music',
      memberName: 'loop',
      guildOnly: true,
      description: 'Repite La Cancion Actual'
    });
  }

  run(message) {
    if (!message.guild.musicData.isPlaying) {
      return message.say('No Hay Canciones Sonando Ahora Mismo!');
    } else if (
      message.guild.musicData.isPlaying &&
      message.guild.triviaData.isTriviaRunning
    ) {
      return message.say('You cannot loop over a trivia!');
    }

    message.channel.send(
      `${message.guild.musicData.nowPlaying.title} added to queue`
    );
    message.guild.musicData.queue.unshift(message.guild.musicData.nowPlaying);
    return;
  }
};
