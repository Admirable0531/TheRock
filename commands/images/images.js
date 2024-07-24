const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const path = require('path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('images')
		.setDescription('Get images from google')
        .addStringOption(option =>
			option
				.setName('query')
				.setDescription('The image you are searching for')
				.setRequired(true)),
	async execute(interaction) {
        require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

        const cx = process.env.CX;
        const key = process.env.GOOGLE_API;

        try {
            const query = interaction.options.getString('query')
            const response = await fetch('https://www.googleapis.com/customsearch/v1?key=' + key + '&cx=' + cx + '&searchType=image&q=' + encodeURIComponent(query), {
                method: 'GET'
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        
            const data = await response.json();
            const item = data.items[0];
            const embed = new EmbedBuilder()
                .setTitle(`Image Result for: ${query}`)
                .setImage(item.link)
                .setURL(item.link);
            interaction.reply({ embeds: [embed] });
            } catch (error) {
            console.error('Error fetching data:', error);
            interaction.reply('There was an error fetching the data.');
        }
    }
}
