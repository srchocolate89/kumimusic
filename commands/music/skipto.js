const { Command } = require('discord.js-commando');

module.exports = class SkipToCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skipto',
      memberName: 'skipto',
      group: 'music',
      description:
        'Salta A Una Canción Específica En La Cola. Con El Número Previsto',
      guildOnly: true,
      args: [
        {
          key: 'songNumber',
          prompt:
            'What is the number in queue of the song you want to skip to?, it needs to be greater than 1',
          type: 'integer'
        }
      ]
    });
  }

  run(message, { songNumber }) {
    if (songNumber < 1 && songNumber >= message.guild.musicData.queue.length) {
      return message.reply('Por Favor Entra Un Numero Valido De Cancion');
    }
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.reply('Entra A Un Canal De Voz E Intentalo De Nuevo');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('No Hay Canciones Sonando Ahora Mismo!');
    }

    if (message.guild.musicData.queue < 1)
      return message.say('No Hay Canciones En La Cola');

    message.guild.musicData.queue.splice(0, songNumber - 1);
    message.guild.musicData.songDispatcher.end();
    return;
  }
};
