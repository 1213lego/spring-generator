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

export async function repositoriesFromEntitiesQuestion(): Promise<any> {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'domainNameFolder',
            message: 'What is the name of the Entities folder?',
            default: 'domain',
            validate: (input) => input ? true : 'The name of entities folder is mandatory'
        },
        {
            type: "list",
            name: "springDataRepository",
            message: "What is the Spring data repository?",
            default: 'JpaRepository',
            validate: (input) => input ? true : 'The name the the Spring data repository is mandatory',
            choices: Object.keys(repositoriePackages)
        },
        {
            name: "repositoriesFolderName",
            type: "input",
            message: "What is your Repository folder?",
            default: "repository"
        }
    ]);
}