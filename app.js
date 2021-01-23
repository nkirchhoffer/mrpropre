require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', () => {
    console.log('Monsieur Propre est prêt !');
});

bot.on('message', message => {
    
});

bot.login(process.env.TOKEN);