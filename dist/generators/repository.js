"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const util_1 = require("util");
const fs = __importStar(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const repository_template_1 = require("./templates/repository.template");
const projectUtils_1 = require("./projectUtils");
const readFileAsync = util_1.promisify(fs.readFile);
async function handleGenerateRepository(arg) {
    const project = await projectUtils_1.projectTree(process.cwd());
    const repositoriesPath = projectUtils_1.searchFile(project, arg.package);
    const entityPath = projectUtils_1.searchFile(project, arg.entity + '.java');
    if (!repositoriesPath || !entityPath) {
        console.log(chalk_1.default.redBright('Couldn\'t continue. not found ', !repositoriesPath ? arg.package : arg.entity));
        process.exit(1);
    }
    let repositoryPackage = models_1.repositoriePackages[arg.repository];
    let name = arg.name || `${arg.entity}Repository`;
    const repositoryTemplateData = {
        package: projectUtils_1.getPackage(repositoriesPath.file),
        imports: [
            { package: repositoryPackage },
            { package: projectUtils_1.getPackage(entityPath.file) }
        ],
        repositoryName: name,
        springRepository: arg.repository,
        entity: arg.entity,
        entityId: arg.id
    };
    await repository_template_1.generateRepository(repositoriesPath.file, repositoryTemplateData);
}
exports.handleGenerateRepository = handleGenerateRepository;
async function handleGenerateRepositoriesFromEntitiesFolder({ repositoriesFolderName, domainNameFolder, springDataRepository }) {
    await generateRepositoriesFromEntitiesFolder(repositoriesFolderName, domainNameFolder, springDataRepository);
}
exports.handleGenerateRepositoriesFromEntitiesFolder = handleGenerateRepositoriesFromEntitiesFolder;
const generateRepositoriesFromEntitiesFolder = async (repositoriesFolderName, domainNameFolder, springDataRepository) => {
    const project = await projectUtils_1.projectTree(process.cwd());
    const repositories = projectUtils_1.searchFile(project, repositoriesFolderName);
    const models = projectUtils_1.searchFile(project, domainNameFolder);
    if (!repositories || !models) {
        console.log(chalk_1.default.redBright('Couldn\'t continue. not found ', !repositories ? repositoriesFolderName : domainNameFolder));
        process.exit(1);
    }
    await masive(models, repositories === null || repositories === void 0 ? void 0 : repositories.file, springDataRepository);
};
const masive = async (modelFiles, repositoriesFolder, springDataRepository) => {
    for (let i = 0; i < modelFiles.files.length; i++) {
        const currentFile = modelFiles.files[i];
        if (currentFile.isDirectory) {
            await masive(currentFile, repositoriesFolder, springDataRepository);
        }
        else {
            const idType = await getTypeIdFromClassFile(currentFile.file);
            if (!idType)
                continue;
            const entityPackage = projectUtils_1.getPackage(currentFile.file);
            const entityName = entityPackage.substr(entityPackage.lastIndexOf('.') + 1);
            const repositoryName = `${entityName}Repository`;
            const repositoryPackage = projectUtils_1.getPackage(repositoriesFolder);
            const springRepositoryPackage = models_1.repositoriePackages[springDataRepository];
            const repositoryTemplate = {
                package: repositoryPackage,
                imports: [
                    { package: entityPackage },
                    { package: springRepositoryPackage }
                ],
                repositoryName: repositoryName,
                springRepository: springDataRepository,
                entity: entityName,
                entityId: idType
            };
            await repository_template_1.generateRepository(repositoriesFolder, repositoryTemplate);
        }
    }
};
async function getTypeIdFromClassFile(filePath) {
    let data = await readFileAsync(filePath);
    let start = data.indexOf('@Id');
    start = start != -1 ? start : data.indexOf('@EmbeddedId');
    const end = data.indexOf(';', start);
    data = data.slice(start, end);
    const idDeclaration = data.toString().split(' ').filter(sr => sr);
    return idDeclaration[idDeclaration.length - 2];
}
