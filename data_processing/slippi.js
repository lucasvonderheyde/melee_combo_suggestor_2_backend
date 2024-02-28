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
const frames = game.getFrames();

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

const lowerportPlayerPreFrames = []
const lowerportPlayerPostFrames = []
const higherportPlayerPreFrames = []
const higherportPlayerPostFrames = []

let frameIndex = 0

while (frameIndex <= lastFrame) {

    lowerportPlayerPreFrames.push(frames[frameIndex].players[0].pre)
    lowerportPlayerPostFrames.push(frames[frameIndex].players[0].post)
    higherportPlayerPreFrames.push(frames[frameIndex].players[1].pre)
    higherportPlayerPostFrames.push(frames[frameIndex].players[1].post)

    frameIndex ++
}

const metadataFilename = `metadata_${gameUuid}.json`
const lowerportMetadataCharactersFilename = `lowerportMetadataCharacters_${gameUuid}.json`
const lowerportMetadataNamesFilename = `lowerportMetadataNames_${gameUuid}.json`
const higherportMetadataCharactersFilename = `higherportMetadataCharacters_${gameUuid}.json`
const higherportMetadataNamesFilename = `higherportMetadataNames_${gameUuid}.json`
const lowerportPlayerPreFramesFilename = `lowerportPreFrames_${gameUuid}.json`
const lowerportPlayerPostFramesFilename = `lowerportPostFrames_${gameUuid}.json`
const higherportPlayerPreFramesFilename = `higherportPreFrames_${gameUuid}.json`
const higherportPlayerPostFramesFilename = `higherportPostFrames_${gameUuid}.json`
const settingsFilename = `settings_${gameUuid}.json`
const playersFilename = `players_${gameUuid}.json`
const gameInfoBlockFilename = `gameInfoBlock_${gameUuid}.json`
const matchInfoFilename = `matchInfo_${gameUuid}.json`


writeToJson(metadataFilename, metadata)
writeToJson(lowerportMetadataCharactersFilename, lowerportMetadataCharacters)
writeToJson(lowerportMetadataNamesFilename, lowerportMetadataNames)
writeToJson(higherportMetadataCharactersFilename, higherportMetadataCharacters)
writeToJson(higherportMetadataNamesFilename, higherportMetadataNames)
writeToJson(settingsFilename, settings)
writeToJson(playersFilename, players)
writeToJson(gameInfoBlockFilename, gameInfo)
writeToJson(matchInfoFilename, matchInfo)
writeToJson(lowerportPlayerPreFramesFilename, lowerportPlayerPreFrames)
writeToJson(lowerportPlayerPostFramesFilename, lowerportPlayerPostFrames)
writeToJson(higherportPlayerPreFramesFilename, higherportPlayerPreFrames)
writeToJson(higherportPlayerPostFramesFilename, higherportPlayerPostFrames)

// console.log(frames[0].players);