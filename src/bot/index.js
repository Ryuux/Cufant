const { Client, GatewayIntentBits, Partials } = require('discord.js')
const User = require('../database/User')

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
    userId: member.user.id,
    discriminator: member.user.discriminator,
    username: member.user.username,
    avatar: member.user.avatar
  })

  await newUser.save()
})

client.on('guildMemberRemove', async (member) => {
  if (member.user.bot) return

  await User.findOneAndDelete({ userId: member.user.id })
})

client.login(process.env.TOKEN)
