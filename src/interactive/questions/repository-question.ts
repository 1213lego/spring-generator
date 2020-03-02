import inquirer from 'inquirer';
import {repositoryChoices} from "../../models";

export async function repositoryQuestion(): Promise<any> {
    return inquirer.prompt([
        {
            type: "list",
            name: "repository",
            message: "What is the repository?",
            choices: repositoryChoices
        }]);
}