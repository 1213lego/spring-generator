import {mainMenu, repositoriesFromEntitiesQuestion, repositoryQuestion} from "./questions";
import {RepositoryArgs} from "../models";
import {handleGenerateRepositoriesFromEntitiesFolder, handleGenerateRepository} from "../generators";

export async function handleInteractiveMode(args: any) {
    require('./intro').showIntro();
    const answer = await mainMenu();
    if (answer.option === 1) {
        const repositoryAnswer = await repositoryQuestion() as RepositoryArgs;
        await handleGenerateRepository(repositoryAnswer);
    } else if (answer.option == 2) {
        const repositoryAnswer = await repositoriesFromEntitiesQuestion();
        await handleGenerateRepositoriesFromEntitiesFolder(repositoryAnswer);
    }
}