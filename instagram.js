const fs = require('fs');
const Discord = require('discord.js');
const { Client, MessageAttachment } = require("discord.js");
const client = new Client();
const save = require('instagram-save');

const helpMessage = require('./embeded.json');
const PREFIX = 'ig';
client.once('ready', () => {
	console.log("Funcionando correctamente.");
});

client.on('message', async message => {
	if (message.content.startsWith(PREFIX)) {
		const input = message.content.slice(PREFIX.length).trim().split(' ');
		const command = input.shift();
		const commandArgs = input.join(' ');
		const downloads = "./images";
		if (command === '-d') {
			const splitArgs = commandArgs.split(' ');
			const link = splitArgs.shift();	
			const flag = splitArgs.join(' ');

			message.reply('Tratando de descargar tu imagen.');

			save(link, downloads).then(res => {
				console.log(res.file);
				let attachment = new MessageAttachment(res.file);
				if(flag === "--p") {
					message.channel.send("Tu imagen está lista", attachment);
				}
				else {
					message.channel.send("Tu imagen está lista", attachment).then(()=>{
						try {
							fs.unlinkSync(res.file);
						
							console.log("Imagen borrada...");
						} catch (error) {
							console.log(error);
						}
					});	
				}
				
			  });
		}
		else if(command === '-h') {
			return message.channel.send({embed: helpMessage});
		}
	}
	
});

client.login('NzU0OTA0OTM4NDc1MjkwNzc0.X17iAg.7u7YeF4wDGUpoCBTXoUblLi2Bz8');