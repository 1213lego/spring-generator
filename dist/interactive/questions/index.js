"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
__export(require("./repository-question"));
async function mainMenu() {
    return inquirer_1.default.prompt([{
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
exports.mainMenu = mainMenu;
