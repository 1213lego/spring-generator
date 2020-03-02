"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const fs = __importStar(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const repository_template_1 = require("./templates/repository.template");
const readdirAsync = util_1.promisify(fs.readdir);
const lstatAsync = util_1.promisify(fs.lstat);
async function handleGenerateRepository(arg) {
    const project = await projectTree(process.cwd());
    const repositoriesPath = searchFile(project, arg.package);
    const entityPath = searchFile(project, arg.entity + '.java');
    if (!repositoriesPath || !entityPath) {
        console.log(chalk_1.default.redBright('Couldn\'t continue. not found ', !repositoriesPath ? arg.package : arg.entity));
        process.exit(1);
    }
    let repositoryPackage = models_1.repositoriePackages[arg.repository];
    let name = arg.name || `${arg.entity}Repository`;
    const repositoryTemplateData = {
        package: getPackage(repositoriesPath.file),
        imports: [
            { package: repositoryPackage },
            { package: getPackage(entityPath.file).replace('.java', '') }
        ],
        interfaceName: name,
        repositoryType: arg.repository,
        entity: arg.entity,
        entityId: arg.id
    };
    await repository_template_1.generateRepository(repositoriesPath.file, repositoryTemplateData);
}
exports.handleGenerateRepository = handleGenerateRepository;
function printTree(rootNode, sangria) {
    if (!rootNode.parentFile)
        console.log(rootNode.file);
    sangria = sangria + '\t';
    rootNode.files.forEach((node) => {
        console.log(sangria, node.file);
        if (node.isDirectory) {
            printTree(node, sangria + '\t');
        }
    });
}
const projectTree = async (folderPath) => {
    const isInSrc = folderPath.includes('src');
    if (isInSrc) {
        while (path_1.default.basename(folderPath) !== 'src') {
            folderPath = path_1.default.join(folderPath, "..");
        }
    }
    else {
        const srcFolder = (await readdirAsync(folderPath))
            .find(fileName => fileName === 'src');
        if (srcFolder) {
            folderPath = path_1.default.join(folderPath, 'src');
        }
        else {
            console.log(chalk_1.default.redBright('Couldn\'t continue. The current folder is not a java project'));
            process.exit(1);
        }
    }
    const filesDir = path_1.default.join(folderPath, 'main', 'java');
    const fileTree = {
        file: filesDir,
        parentFile: null,
        isDirectory: true,
        files: []
    };
    await buildTree(fileTree);
    return fileTree;
};
const buildTree = async (rootNode) => {
    let namesOfFiles = await readdirAsync(rootNode.file);
    for (let i = 0; i < namesOfFiles.length; i++) {
        const currentFileName = path_1.default.join(rootNode.file, namesOfFiles[i]);
        const fileStat = await lstatAsync(currentFileName);
        const newFile = {
            file: currentFileName,
            parentFile: rootNode,
            isDirectory: fileStat.isDirectory(),
            files: []
        };
        rootNode.files.push(newFile);
        if (newFile.isDirectory) {
            await buildTree(newFile);
        }
    }
};
const searchFile = (rootNode, baseName) => {
    if (path_1.default.basename(rootNode.file) === baseName)
        return rootNode;
    for (let file of rootNode.files) {
        const found = searchFile(file, baseName);
        if (found)
            return found;
    }
    return null;
};
function getPackage(packagePath) {
    let parts = packagePath.split(path_1.default.sep);
    parts = parts.splice(parts.findIndex(value => value === "java") + 1);
    return parts.join(".");
}
