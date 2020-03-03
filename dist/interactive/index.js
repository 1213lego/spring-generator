"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const questions_1 = require("./questions");
const generators_1 = require("../generators");
async function handleInteractiveMode(args) {
    require('./intro').showIntro();
    const answer = await questions_1.mainMenu();
    if (answer.option === 1) {
        const repositoryAnswer = await questions_1.repositoryQuestion();
        await generators_1.handleGenerateRepository(repositoryAnswer);
    }
    else if (answer.option == 2) {
        const repositoryAnswer = await questions_1.repositoriesFromEntitiesQuestion();
        await generators_1.handleGenerateRepositoriesFromEntitiesFolder(repositoryAnswer);
    }
}
exports.handleInteractiveMode = handleInteractiveMode;
