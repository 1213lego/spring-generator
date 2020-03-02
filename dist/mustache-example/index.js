"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mustache_1 = __importDefault(require("mustache"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const view = {
    package: "com.lego.proapi.repository",
    imports: [
        { package: "com.lego.proapi.domain.Role" },
        { package: "org.springframework.data.jpa.repository.JpaRepository" }
    ],
    interfaceName: "BikeRepository",
    repositoryType: "JpaRepository",
    entity: "Bike",
    entityId: "Short",
    wrapped: function () {
        return function (text, render) {
            text = text + "" + "{{entity}}";
            return "<b>" + render(text) + "</b>";
        };
    }
};
const repository = mustache_1.default.render(fs_1.default.readFileSync(path_1.default.join(__dirname, 'repository.mustache')).toString(), view);
console.log(repository);
