require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();

const message = require('./src/message');

const cleanChannels = [
    process.env.WHITELIST_CHANNEL_ID,
    process.env.BLACKLIST_CHANNEL_ID,
    process.env.TEST_CHANNEL_ID
];

bot.on('ready', () => {
    console.log('Monsieur Propre est prêt !');
});

bot.on('message', msg => {
    if (cleanChannels.indexOf(msg.channel.id) !== -1) {

        message.checkMessage(msg.content).then(res => {
            msg.react('✅');
        }).catch(error => {
            msg.author.send(error.message);
            msg.delete();
        });

    }
});

bot.login(process.env.TOKEN);