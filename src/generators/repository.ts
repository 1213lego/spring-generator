import {repositoriePackages, RepositoryArgs} from '../models';
import {promisify} from 'util';
import * as fs from 'fs';
import chalk from 'chalk';
import {generateRepository, RepositoryTemplate} from "./templates/repository.template";
import {FileNode, getPackage, projectTree, searchFile} from "./projectUtils";

const readFileAsync = promisify(fs.readFile);

export async function handleGenerateRepository(arg: RepositoryArgs) {
    const project = await projectTree(process.cwd());
    const repositoriesPath = searchFile(project, arg.package);
    const entityPath = searchFile(project, arg.entity + '.java');
    if (!repositoriesPath || !entityPath) {
        console.log(chalk.redBright('Couldn\'t continue. not found ',
            !repositoriesPath ? arg.package : arg.entity));
        process.exit(1);
    }
    let repositoryPackage = repositoriePackages[arg.repository];
    let name = arg.name || `${arg.entity}Repository`;
    const repositoryTemplateData: RepositoryTemplate = {
        package: getPackage(repositoriesPath.file),
        imports: [
            {package: repositoryPackage},
            {package: getPackage(entityPath.file)}
        ],
        repositoryName: name,
        springRepository: arg.repository,
        entity: arg.entity,
        entityId: arg.id
    };
    await generateRepository(repositoriesPath.file, repositoryTemplateData);
}

export async function handleGenerateRepositoriesFromEntitiesFolder(
    {repositoriesFolderName, domainNameFolder, springDataRepository}:
        { repositoriesFolderName: string, domainNameFolder: string, springDataRepository: string }) {
    await generateRepositoriesFromEntitiesFolder(repositoriesFolderName, domainNameFolder, springDataRepository);
}

const generateRepositoriesFromEntitiesFolder = async (repositoriesFolderName: string, domainNameFolder: string, springDataRepository: string) => {
    const project = await projectTree(process.cwd());
    const repositories = searchFile(project, repositoriesFolderName);
    const models = searchFile(project, domainNameFolder);
    if (!repositories || !models) {
        console.log(chalk.redBright('Couldn\'t continue. not found ',
            !repositories ? repositoriesFolderName : domainNameFolder));
        process.exit(1);
    }
    await masive(models, repositories?.file, springDataRepository)
};
const masive = async (modelFiles: FileNode, repositoriesFolder: string, springDataRepository: string) => {
    for (let i = 0; i < modelFiles.files.length; i++) {
        const currentFile = modelFiles.files[i];
        if (currentFile.isDirectory) {
            await masive(currentFile, repositoriesFolder, springDataRepository);
        } else {
            const idType = await getTypeIdFromClassFile(currentFile.file);
            if (!idType) continue;
            const entityPackage = getPackage(currentFile.file);
            const entityName = entityPackage.substr(entityPackage.lastIndexOf('.') + 1);
            const repositoryName = `${entityName}Repository`;
            const repositoryPackage = getPackage(repositoriesFolder);
            const springRepositoryPackage = repositoriePackages[springDataRepository];
            const repositoryTemplate: RepositoryTemplate = {
                package: repositoryPackage,
                imports: [
                    {package: entityPackage},
                    {package: springRepositoryPackage}
                ],
                repositoryName: repositoryName,
                springRepository: springDataRepository,
                entity: entityName,
                entityId: idType
            };
            await generateRepository(repositoriesFolder, repositoryTemplate);
        }
    }
};

async function getTypeIdFromClassFile(filePath: string): Promise<string> {
    let data = await readFileAsync(filePath);
    let start = data.indexOf('@Id');
    start = start != -1 ? start : data.indexOf('@EmbeddedId');
    const end = data.indexOf(';', start);
    data = data.slice(start, end);
    const idDeclaration = data.toString().split(' ').filter(sr => sr);
    return idDeclaration[idDeclaration.length - 2];
}
