

const { SlippiGame } = require("@slippi/slippi-js")
const fs = require('fs')
const uuid = require('uuid')

const game = new SlippiGame("test.slp")

gameUuid = uuid.v4()

const settings = game.getSettings()
const players = settings.players
const gameInfo = settings.gameInfoBlock
const matchInfo = settings.matchInfo

delete settings.players 
delete settings.gameInfoBlock
delete settings.matchInfo

const settingsFilename = `settings_${gameUuid}.json`
const playersFilename = `players_${gameUuid}.json`
const gameInfoBlockFilename = `gameInfoBlock_${gameUuid}.json`
const matchInfoFilename = `matchInfo_${gameUuid}.json`

function writeToJson(filename, data) {
    fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
        console.log(`${filename} has been saved.`)
    });
}

writeToJson(settingsFilename, settings)
writeToJson(playersFilename, players)
writeToJson(gameInfoBlockFilename, gameInfo)
writeToJson(matchInfoFilename, matchInfo)


const metadata = game.getMetadata()
lastFrame = metadata.lastFrame
// console.log(typeof(metadata))


// Get frames – animation state, inputs, etc
// This is used to compute your own stats or get more frame-specific info (advanced)
const frames = game.getFrames();
// console.log(frames[0].players); // Print frame when timer starts counting down