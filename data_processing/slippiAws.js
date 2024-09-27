const { SlippiGame } = require("@slippi/slippi-js");
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

const fs = require('fs');
const uuid = require('uuid');

// Configure AWS SDK
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

const myBucketName = process.env.AWS_S3_BUCKET_NAME;  // Ensure this is set in your .env file
const game = new SlippiGame("test.slp");
const gameUuid = uuid.v4();

async function uploadJsonToS3(filename, jsonData) {
    const params = {
        Bucket: myBucketName,
        Key: filename,
        Body: JSON.stringify(jsonData, null, 2),
        ContentType: 'application/json'
    };

    try {
        const command = new PutObjectCommand(params);
        await s3Client.send(command);
        console.log(`${filename} uploaded to ${myBucketName}.`);
    } catch (error) {
        console.error(`Error uploading ${filename}:`, error);
    }
}

const settings = game.getSettings();
const metadata = game.getMetadata();
const frames = game.getFrames();

const metadataPlayers = metadata.players;
const lowerportMetadataNames = metadataPlayers[0].names;
const lowerportMetadataCharacters = metadataPlayers[0].characters;
const higherportMetadataNames = metadataPlayers[1].names;
const higherportMetadataCharacters = metadataPlayers[1].characters;
const lastFrame = metadata.lastFrame;

const players = settings.players;
const gameInfo = settings.gameInfoBlock;
const matchInfo = settings.matchInfo;

delete metadata.players;
delete settings.players;
delete settings.gameInfoBlock;
delete settings.matchInfo;

const lowerportPlayerPreFrames = [];
const lowerportPlayerPostFrames = [];
const higherportPlayerPreFrames = [];
const higherportPlayerPostFrames = [];

let frameIndex = 0;

while (frameIndex <= lastFrame) {
    lowerportPlayerPreFrames.push(frames[frameIndex].players[0].pre);
    lowerportPlayerPostFrames.push(frames[frameIndex].players[0].post);
    higherportPlayerPreFrames.push(frames[frameIndex].players[1].pre);
    higherportPlayerPostFrames.push(frames[frameIndex].players[1].post);
    frameIndex++;
}

const metadataFilename = `metadata_${gameUuid}.json`;
const lowerportMetadataCharactersFilename = `lowerportMetadataCharacters_${gameUuid}.json`;
const lowerportMetadataNamesFilename = `lowerportMetadataNames_${gameUuid}.json`;
const higherportMetadataCharactersFilename = `higherportMetadataCharacters_${gameUuid}.json`;
const higherportMetadataNamesFilename = `higherportMetadataNames_${gameUuid}.json`;
const lowerportPlayerPreFramesFilename = `lowerportPreFrames_${gameUuid}.json`;
const lowerportPlayerPostFramesFilename = `lowerportPostFrames_${gameUuid}.json`;
const higherportPlayerPreFramesFilename = `higherportPreFrames_${gameUuid}.json`;
const higherportPlayerPostFramesFilename = `higherportPostFrames_${gameUuid}.json`;
const settingsFilename = `settings_${gameUuid}.json`;
const playersFilename = `players_${gameUuid}.json`;
const gameInfoBlockFilename = `gameInfoBlock_${gameUuid}.json`;
const matchInfoFilename = `matchInfo_${gameUuid}.json`;

async function main() {
    await uploadJsonToS3(metadataFilename, metadata);
    await uploadJsonToS3(lowerportMetadataCharactersFilename, lowerportMetadataCharacters);
    await uploadJsonToS3(lowerportMetadataNamesFilename, lowerportMetadataNames);
    await uploadJsonToS3(higherportMetadataCharactersFilename, higherportMetadataCharacters);
    await uploadJsonToS3(higherportMetadataNamesFilename, higherportMetadataNames);
    await uploadJsonToS3(settingsFilename, settings);
    await uploadJsonToS3(playersFilename, players);
    await uploadJsonToS3(gameInfoBlockFilename, gameInfo);
    await uploadJsonToS3(matchInfoFilename, matchInfo);
    await uploadJsonToS3(lowerportPlayerPreFramesFilename, lowerportPlayerPreFrames);
    await uploadJsonToS3(lowerportPlayerPostFramesFilename, lowerportPlayerPostFrames);
    await uploadJsonToS3(higherportPlayerPreFramesFilename, higherportPlayerPreFrames);
    await uploadJsonToS3(higherportPlayerPostFramesFilename, higherportPlayerPostFrames);
}

main().catch(err => console.error('Error in main function:', err));
