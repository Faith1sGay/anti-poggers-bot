const Eris = require('eris')
const { token, bannedWords } = require('./config.json')
const bot = new Eris(token)
var date = new Date()
bot.on('ready', () => {
  console.log(`logged in on ${date}`)
})
bot.on('messageCreate', async m => {
  if (m.author.bot) return
  if (m.content.includes(bannedWords)) { // to lowercase this
    try {
      await m.channel.createMessage(`${m.author.username} has said a banned word!`)
      await bot.banGuildMember(m.channel.guild.id, m.author.id, 0, 'said banned word')
    } catch (e) {
      await bot.createMessage(m.channel.id, `Error: ${e.message}`)
    }
    console.log(`${m.author.username} has been banned from ${m.channel.guild.name} for saying a banned word.`)
  }
})
bot.connect()
