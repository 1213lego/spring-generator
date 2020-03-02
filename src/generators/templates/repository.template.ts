export interface RepositoryTemplate {
    package: string,
    imports: Array<{package: string}>,
    interfaceName: string,
    repositoryType: string,
    entity: string,
    entityId: string
}