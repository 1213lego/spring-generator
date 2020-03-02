"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const figlet_1 = __importDefault(require("figlet"));
function showIntro() {
    console.log(chalk_1.default.bold.greenBright(figlet_1.default.textSync("Spring Generator", {
        font: "ANSI Shadow",
        verticalLayout: "controlled smushing",
        horizontalLayout: "default"
    })));
    console.log(chalk_1.default.cyanBright("\n\tA Simple CLI Based Spring Generator Using Node JS! 👍"));
    console.log(chalk_1.default.cyanBright(`\tFor Commands Run ${chalk_1.default.greenBright("Just Follow These Instruction\n")} `));
}
exports.showIntro = showIntro;
