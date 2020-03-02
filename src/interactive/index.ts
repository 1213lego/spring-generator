import {repositoryQuestion} from "./questions";
import {RepositoryArgs} from "../models";
import {handleGenerateRepository} from "../generators";

export async function handleInteractiveMode(args: any) {
    require('./intro').showIntro();
    console.log('Interactive mode', args);
    const repositoryAnswer = await repositoryQuestion() as RepositoryArgs;
    console.log(repositoryAnswer);
    await handleGenerateRepository(repositoryAnswer);
}