import path from "path";
import mustache from "mustache";
import * as fs from "fs";
import {promisify} from 'util';
import chalk from "chalk";

const readFileAsync = promisify(fs.readFile);

export interface RepositoryTemplate {
    package: string,
    imports: Array<{ package: string }>,
    repositoryName: string,
    springRepository: string,
    entity: string,
    entityId: string
}

export async function generateRepository(repositoriesPath: string, repositoryTemplate: RepositoryTemplate) {
    const repositoryTemplateFile = await readFileAsync(path.join(__dirname, 'repository.mustache'));
    const repositoryRenderized = mustache.render(repositoryTemplateFile.toString(), repositoryTemplate);
    const outRepository = fs.createWriteStream(path.join(repositoriesPath, `${repositoryTemplate.repositoryName}.java`));
    outRepository.write(repositoryRenderized);
    console.log(chalk.greenBright('Repository generated in ' + outRepository.path));
}