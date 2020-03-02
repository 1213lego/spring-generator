import yargs, {Argv} from 'yargs';
import {handleGenerateController, handleGenerateRepository} from './generators';
import {handleInteractiveMode} from './interactive';
import {repositoriePackages} from './models';

function setUpRepositoryOptions(args: Argv<object>) {
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
            choices: Object.keys(repositoriePackages),
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
        })
}

function setUpInteractiveOptions(args: Argv<object>) {
}

yargs
    .version("1.0")
    .command(['*', "interactive", "i"], 'Load the Interactive mode', setUpInteractiveOptions, handleInteractiveMode)
    .command(['generate', 'g'], 'Generate diferent things of Spring', (yargs) => {
        yargs.command(['controller', 'c'], "Generate Spring rest controller", {}, handleGenerateController);
        yargs.command(['repository', 'r'], "Generate Spring data repository", setUpRepositoryOptions, handleGenerateRepository);

    })
    .help()
    .argv;
