import chalk from 'chalk';

console.log(chalk.keyword('orange')('Yay for orange colored text!'));
console.log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'));
console.log(chalk`
CPU: {red ${process.cpuUsage().system}%}
RAM: {green ${process.memoryUsage().heapUsed / process.memoryUsage().heapTotal * 100}%}
DISK: {rgb(255,131,0) ${50 / 100 * 100}%}
`);
const name = 'Sindre';
console.log(chalk.blue('Hello %s'), name);