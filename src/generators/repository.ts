import {repositoriePackages, RepositoryArgs} from '../models';
import path from 'path';
import {promisify} from 'util';
import * as fs from 'fs';
import chalk from 'chalk';
import {generateRepository, RepositoryTemplate} from "./templates/repository.template";

const readdirAsync = promisify(fs.readdir);
const lstatAsync = promisify(fs.lstat);

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
            {package: getPackage(entityPath.file).replace('.java', '')}
        ],
        interfaceName: name,
        repositoryType: arg.repository,
        entity: arg.entity,
        entityId: arg.id
    };
    await generateRepository(repositoriesPath.file, repositoryTemplateData);
}

export interface FileNode {
    file: string,
    parentFile: FileNode | null,
    isDirectory: boolean,
    files: Array<FileNode>
}

function printTree(rootNode: FileNode, sangria: string) {
    if (!rootNode.parentFile) console.log(rootNode.file);
    sangria = sangria + '\t';
    rootNode.files.forEach((node) => {
        console.log(sangria, node.file);
        if (node.isDirectory) {
            printTree(node, sangria + '\t');
        }
    })
}

const projectTree = async (folderPath: string): Promise<FileNode> => {
    const isInSrc = folderPath.includes('src');
    if (isInSrc) {
        while (path.basename(folderPath) !== 'src') {
            folderPath = path.join(folderPath, "..");
        }
    } else {
        const srcFolder = (await readdirAsync(folderPath))
            .find(fileName => fileName === 'src');
        if (srcFolder) {
            folderPath = path.join(folderPath, 'src');
        } else {
            console.log(chalk.redBright('Couldn\'t continue. The current folder is not a java project'));
            process.exit(1);
        }
    }
    const filesDir = path.join(folderPath, 'main', 'java');
    const fileTree: FileNode = {
        file: filesDir,
        parentFile: null,
        isDirectory: true,
        files: []
    };
    await buildTree(fileTree);
    return fileTree;
};
const buildTree = async (rootNode: FileNode) => {
    let namesOfFiles = await readdirAsync(rootNode.file);
    for (let i = 0; i < namesOfFiles.length; i++) {
        const currentFileName = path.join(rootNode.file, namesOfFiles[i]);
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
const searchFile = (rootNode: FileNode, baseName: string): FileNode | null => {
    if (path.basename(rootNode.file) === baseName) return rootNode;
    for (let file of rootNode.files) {
        const found = searchFile(file, baseName);
        if (found) return found;
    }
    return null;
};

function getPackage(packagePath: string): string {
    let parts = packagePath.split(path.sep);
    parts = parts.splice(parts.findIndex(value => value === "java") + 1);
    return parts.join(".");
}
