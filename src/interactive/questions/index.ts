import inquirer from 'inquirer';

export * from './repository-question';

export async function mainMenu(): Promise<any> {
    return inquirer.prompt([{
        type: "list",
        name: "option",
        message: "What do you want to generate",
        choices: [{
            name: 'Repository', value: 1
        }, {
            name: 'Repositories from entities folder', value: 2
        }],
        default: 'repository',
    }]);
}