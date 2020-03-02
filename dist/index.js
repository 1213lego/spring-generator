"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const generators_1 = require("./generators");
const interactive_1 = require("./interactive");
const models_1 = require("./models");
function setUpRepositoryOptions(args) {
    args
        .option('entity', {
        alias: 'e',
        demandOption: true,
        description: 'Name of the Java Entity class. Examples: model.Bike, Bike; ' +
            'If you don\'t specified the parent package the Application will search in whole project directory for generate the ' +
            'import in the repository',
        type: 'string',
    })
        .option('repository', {
        alias: 'r',
        choices: Object.keys(models_1.repositoriePackages),
        type: 'string',
        description: 'Name of the Spring data repository',
        default: 'JpaRepository'
    })
        .option('id', {
        alias: 'i',
        type: 'string',
        demandOption: true,
        description: 'Name of the entity type'
    })
        .option('package', {
        alias: 'p',
        type: 'string',
        default: 'repository',
        description: 'Name of the package(folder) where the repository will be save and the java repository file'
    })
        .option('name', {
        alias: 'n',
        type: 'string',
        description: 'Name of the repository that will be generated. By default the application generates (entityname)Repository.java'
    });
}
function setUpInteractiveOptions(args) {
}
yargs_1.default
    .version("1.0")
    .command(['*', "interactive", "i"], 'Load the Interactive mode', setUpInteractiveOptions, interactive_1.handleInteractiveMode)
    .command(['generate', 'g'], 'Generate diferent things of Spring', (yargs) => {
    yargs.command(['controller', 'c'], "Generate Spring rest controller", {}, generators_1.handleGenerateController);
    yargs.command(['repository', 'r'], "Generate Spring data repository", setUpRepositoryOptions, generators_1.handleGenerateRepository);
})
    .help()
    .argv;
