const { Command } = require('discord.js-commando');

module.exports = class ResumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'resume',
      aliases: ['resume-song', 'continue'],
      memberName: 'resume',
      group: 'music',
      description: 'Reaunda La Canción Pausada',
      guildOnly: true
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.reply('Entra A Un Canal De Voz Y Vuelve A Intentarlo');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher === null
    ) {
      return message.reply('No Hay Canciones Sonando Ahora Mismo!');
    }

    message.say('Song resumed :play_pause:');

    message.guild.musicData.songDispatcher.resume();
  }
};
