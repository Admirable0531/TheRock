const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const path = require('path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('youtube')
		.setDescription('Get videos from youtube')
        .addStringOption(option =>
			option
				.setName('query')
				.setDescription('The video you are searching for')
				.setRequired(true)),
	async execute(interaction) {
        require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

        const key = process.env.YOUTUBE_API;

        try {
            const query = interaction.options.getString('query')
            const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${key}`, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json'
                }
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const item = data.items[0];
            interaction.reply(`https://www.youtube.com/watch?v=${item.id.videoId}`);
            } catch (error) {
            console.error('Error fetching data:', error);
            interaction.reply('There was an error fetching the data.');
        }
    }
}
