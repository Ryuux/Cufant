const { Client, GatewayIntentBits, Partials } = require('discord.js')
const User = require('../models/User')

const initializeBot = () => {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildBans,
      GatewayIntentBits.GuildEmojisAndStickers,
      GatewayIntentBits.GuildIntegrations,
      GatewayIntentBits.GuildWebhooks,
      GatewayIntentBits.GuildInvites,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildMessageTyping,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.DirectMessageReactions,
      GatewayIntentBits.DirectMessageTyping,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildScheduledEvents,
      GatewayIntentBits.AutoModerationConfiguration,
      GatewayIntentBits.AutoModerationExecution
    ],

    partials: [
      Partials.USER,
      Partials.CHANNEL,
      Partials.GUILD_MEMBER,
      Partials.MESSAGE,
      Partials.REACTION
    ]
  })

  client.on('guildMemberAdd', async (member) => {
    if (member.user.bot) return

    const newUser = new User({
      username: member.user.username,
      discriminator: member.user.discriminator,
      member: member.user.username + '#' + member.user.discriminator,
      id: member.user.id,
      avatar: member.user.avatar
    })

    if (member.user.banner !== undefined) {
      newUser.banner = member.user.banner
    }

    if (member.user.accentColor !== undefined) {
      newUser.accentColor = member.user.accentColor
    }

    await newUser.save()
  })

  client.on('guildMemberRemove', async (member) => {
    if (member.user.bot) return

    await User.findOneAndDelete({ id: member.user.id })
  })

  client.login(process.env.TOKEN)
}
module.exports = initializeBot
