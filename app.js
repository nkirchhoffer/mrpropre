require('dotenv').config();
const Discord = require('discord.js');
const blacklist = require('./src/db/blacklist');
const whitelist = require('./src/db/whitelist');
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
    if (cleanChannels.indexOf(msg.channel.id) !== -1 && !msg.author.bot) {

        message.checkMessage(msg.content).then(url => {
            if (msg.channel.id === process.env.WHITELIST_CHANNEL_ID) {
                whitelist.add(url).then(() => {
                    msg.react('✅');
                }).catch(msg.author.send);
            } else if (msg.channel.id === process.env.BLACKLIST_CHANNEL_ID) {
                blacklist.add(url).then(() => {
                    msg.react('✅');
                }).catch(msg.author.send);
            } else if (msg.channel.id === process.env.TEST_CHANNEL_ID) {
                msg.react('💩');
            }
        }).catch(error => {
            msg.author.send(error.message);
            msg.delete();
        });

    }
});

bot.login(process.env.TOKEN);