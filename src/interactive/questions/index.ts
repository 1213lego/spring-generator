import inquirer from 'inquirer';

export * from './repository-question';

export async function mainMenu(): Promise<any> {
    return inquirer.prompt([{
        type: "list",
        name: "option",
        message: "What do you want to generate",
        choices: ['repository', 'controller'],
        default: 'repository',
    }]);
}