

const { SlippiGame } = require("@slippi/slippi-js")
const fs = require('fs')
const uuid = require('uuid')

const game = new SlippiGame("test.slp")

gameUuid = uuid.v4()

function writeToJson(filename, data) {
    fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
        console.log(`${filename} has been saved.`)
    });
}

const settings = game.getSettings()
const metadata = game.getMetadata()


const metadataPlayers = metadata.players
const lowerportMetadataNames = metadataPlayers[0].names
const lowerportMetadataCharacters = metadataPlayers[0].characters
const higherportMetadataNames = metadataPlayers[1].names
const higherportMetadataCharacters = metadataPlayers[1].characters
const lastFrame = metadata.lastFrame

const players = settings.players
const gameInfo = settings.gameInfoBlock
const matchInfo = settings.matchInfo

delete metadata.players

delete settings.players 
delete settings.gameInfoBlock
delete settings.matchInfo

const metadataFilename = `metadata_${gameUuid}.json`
const lowerportMetadataCharactersFilename = `lowerportMetadataCharacters_${gameUuid}.json`
const lowerportMetadataNamesFilename = `lowerportMetadataNames_${gameUuid}.json`
const higherportMetadataCharactersFilename = `higherportMetadataCharacters_${gameUuid}.json`
const higherportMetadataNamesFilename = `higherportMetadataNames_${gameUuid}.json`


const settingsFilename = `settings_${gameUuid}.json`
const playersFilename = `players_${gameUuid}.json`
const gameInfoBlockFilename = `gameInfoBlock_${gameUuid}.json`
const matchInfoFilename = `matchInfo_${gameUuid}.json`

// writeToJson(metadataFilename, metadata)
writeToJson(lowerportMetadataCharactersFilename, lowerportMetadataCharacters)
writeToJson(lowerportMetadataNamesFilename, lowerportMetadataNames)
writeToJson(higherportMetadataCharactersFilename, higherportMetadataCharacters)
writeToJson(higherportMetadataNamesFilename, higherportMetadataNames)


// writeToJson(settingsFilename, settings)
// writeToJson(playersFilename, players)
// writeToJson(gameInfoBlockFilename, gameInfo)
// writeToJson(matchInfoFilename, matchInfo)


// Get frames – animation state, inputs, etc
// This is used to compute your own stats or get more frame-specific info (advanced)
const frames = game.getFrames();
// console.log(frames[0].players); // Print frame when timer starts counting down