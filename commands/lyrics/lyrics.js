
const { SlashCommandBuilder } = require('discord.js');
const path = require('path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lyrics')
		.setDescription('Get song lyrics from genius')
        .addStringOption(option =>
			option
				.setName('song')
				.setDescription('The song name')
				.setRequired(true)),
	async execute(interaction) {
        require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

        const token = process.env.GENIUS_TOKEN;

        try {
            const song_name = interaction.options.getString('song')
            const response = await fetch('https://api.genius.com/search?q=' + encodeURIComponent(song_name), {
                method: 'GET',
                headers: {
                'User-Agent': 'CompuServe Classic/1.22',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
                }
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        
            const data = await response.json();
            const fullTitles = data.response.hits.map(hit => hit.result.full_title);
            const id = data.response.hits.map(hit => hit.result.id);
            interaction.reply(`Here are the full titles:\n${fullTitles[0]} ${id[0]}`);
            } catch (error) {
            console.error('Error fetching data:', error);
            interaction.reply('There was an error fetching the data.');
        }
    }
}
