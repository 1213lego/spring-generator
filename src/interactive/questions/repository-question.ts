import inquirer from 'inquirer';
import {repositoriePackages, RepositoryArgs} from "../../models";

export async function repositoryQuestion(): Promise<RepositoryArgs> {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'entity',
            message: 'What is the name of the Entity?',
            validate: (input) => input ? true : 'The name of entity is mandatory'
        },
        {
            name: "id",
            type: "input",
            message: "What is the type of the primary key?",
            default: 'Long'
        },
        {
            type: "list",
            name: "repository",
            message: "What is the Spring data repository?",
            default: 'JpaRepository',
            validate: (input) => input ? true : 'The name the the Spring data repository is mandatory',
            choices: Object.keys(repositoriePackages)
        },
        {
            name: "package",
            type: "input",
            message: "What is your Repository package?",
            default: "repository"
        },
        {
            name: "name",
            type: "input",
            message: "Name of the repository that will be generated.By default " +
                "the application generates (entityname)Repository.java",
        }
    ]);
}