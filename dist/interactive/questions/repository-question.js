"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const models_1 = require("../../models");
async function repositoryQuestion() {
    return inquirer_1.default.prompt([
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
            choices: Object.keys(models_1.repositoriePackages)
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
exports.repositoryQuestion = repositoryQuestion;
async function repositoriesFromEntitiesQuestion() {
    return inquirer_1.default.prompt([
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
            choices: Object.keys(models_1.repositoriePackages)
        },
        {
            name: "repositoriesFolderName",
            type: "input",
            message: "What is your Repository folder?",
            default: "repository"
        }
    ]);
}
exports.repositoriesFromEntitiesQuestion = repositoriesFromEntitiesQuestion;
