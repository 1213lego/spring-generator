"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const questions_1 = require("./questions");
const generators_1 = require("../generators");
async function handleInteractiveMode(args) {
    require('./intro').showIntro();
    console.log('Interactive mode', args);
    const answer = await questions_1.mainMenu();
    if (answer.option === 'repository') {
        const repositoryAnswer = await questions_1.repositoryQuestion();
        console.log(repositoryAnswer);
        await generators_1.handleGenerateRepository(repositoryAnswer);
    }
}
exports.handleInteractiveMode = handleInteractiveMode;
