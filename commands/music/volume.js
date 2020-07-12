const { Command } = require('discord.js-commando');

module.exports = class VolumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'volume',
      aliases: ['change-volume'],
      group: 'music',
      memberName: 'volume',
      guildOnly: true,
      description: 'Ajusta El Volumen',
      throttling: {
        usages: 1,
        duration: 5
      },
      args: [
        {
          key: 'wantedVolume',
          prompt: 'Cuanto Volumen Quieres Que Tenga? Del 1 Al 200',
          type: 'integer',
          validate: wantedVolume => wantedVolume >= 1 && wantedVolume <= 200
        }
      ]
    });
  }
  //MADE BY CTK
  run(message, { wantedVolume }) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.reply('Entra A Un Canal De Voz E Intentalo De Nuevo');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('No Hay Canciones Sonando Ahora Mismo!');
    }
    const volume = wantedVolume / 100;
    message.guild.musicData.volume = volume;
    message.guild.musicData.songDispatcher.setVolume(volume);
    message.say(`Current volume is: ${wantedVolume}%`);
  }
};
