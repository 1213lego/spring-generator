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
const path_1 = __importDefault(require("path"));
const mustache_1 = __importDefault(require("mustache"));
const fs = __importStar(require("fs"));
const util_1 = require("util");
const chalk_1 = __importDefault(require("chalk"));
const readFileAsync = util_1.promisify(fs.readFile);
async function generateRepository(repositoriesPath, repositoryTemplate) {
    const repositoryTemplateFile = await readFileAsync(path_1.default.join(__dirname, 'repository.mustache'));
    const repositoryRenderized = mustache_1.default.render(repositoryTemplateFile.toString(), repositoryTemplate);
    const outRepository = fs.createWriteStream(path_1.default.join(repositoriesPath, `${repositoryTemplate.interfaceName}.java`));
    outRepository.write(repositoryRenderized);
    console.log(chalk_1.default.greenBright('Repository generated in ' + outRepository.path));
}
exports.generateRepository = generateRepository;
