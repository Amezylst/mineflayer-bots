// Currently this does nothing besides log you in to whatever server you want

const mineflayer = require('mineflayer')
const path = require('path')

if (process.argv.length !== 5) {
  console.log('Usage : node core.js <host> <port> <user>')
  process.exit(1)
}

// Enter in the path to your launcher_profiles.json here
// Usually you can find this by searching for %appdata% and selecting the .minecraft foler
const profile = require(path.resolve('C:\ENTER\YOUR\PATH\HERE\AppData\.minecraft', 'launcher_profiles.json'))

const session = findUser(process.argv[4].toLowerCase())

const bot = mineflayer.createBot({
  host: process.argv[2],
  port: parseInt(process.argv[3]),
  session,
  version: "1.12.2",
  verbose: true,
  checkTimeoutInterval: (25 * 10000) // Bot will disconnect after 20 seconds without this
})

bot.once('login', () => {
  console.log('Logged in')
})

function findUser(user) {
  for (const prof in profile.authenticationDatabase) {
    for (const uuid in profile.authenticationDatabase[prof].profiles) {
      if (profile.authenticationDatabase[prof].profiles[uuid].displayName.toLowerCase() === user) {
        const userProfile = {
          accessToken: profile.authenticationDatabase[prof].accessToken,
          clientToken: profile.clientToken,
          selectedProfile: {
            id: uuid,
            name: profile.authenticationDatabase[prof].profiles[uuid].displayName
          }
        }
        return userProfile
      }
    }
  }
}
