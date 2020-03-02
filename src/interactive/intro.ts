import chalk from "chalk";
import figlet from "figlet";

export function showIntro() {
    console.log(
        chalk.bold.greenBright(
            figlet.textSync(
                "Spring Generator",
                {
                    font: "ANSI Shadow",
                    verticalLayout: "controlled smushing",
                    horizontalLayout: "default"
                }
            )
        )
    );
    console.log(
        chalk.cyanBright(
            "\n\tA Simple CLI Based Spring Generator Using Node JS! 👍"
        )
    );
    console.log(
        chalk.cyanBright(
            `\tFor Commands Run ${chalk.greenBright(
                "Just Follow These Instruction\n"
            )} `
        )
    );
}