"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
console.log(chalk_1.default.keyword('orange')('Yay for orange colored text!'));
console.log(chalk_1.default.rgb(123, 45, 67).underline('Underlined reddish color'));
console.log(chalk_1.default `
CPU: {red ${process.cpuUsage().system}%}
RAM: {green ${process.memoryUsage().heapUsed / process.memoryUsage().heapTotal * 100}%}
DISK: {rgb(255,131,0) ${50 / 100 * 100}%}
`);
const name = 'Sindre';
console.log(chalk_1.default.blue('Hello %s'), name);
