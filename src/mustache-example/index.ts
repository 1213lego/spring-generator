import mustache from 'mustache';
import fs from 'fs';
import path from 'path'

const view = {
    package: "com.lego.proapi.repository",
    imports: [
        {package: "com.lego.proapi.domain.Role"},
        {package: "org.springframework.data.jpa.repository.JpaRepository"}
    ],
    interfaceName: "BikeRepository",
    repositoryType: "JpaRepository",
    entity: "Bike",
    entityId: "Short",
    wrapped: function () {
        return function (text: any, render: any) {
            text = text + "" + "{{entity}}";
            return "<b>" + render(text) + "</b>"
        }
    }
};
const repository = mustache.render(fs.readFileSync(path.join(__dirname, 'repository.mustache')).toString(), view);
console.log(repository);
