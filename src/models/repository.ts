export interface RepositoryPackage {
    [name: string]: string
}

export const repositoriePackages: RepositoryPackage = {
    'JpaRepository': 'org.springframework.data.jpa.repository.JpaRepository',
    'CrudRepository': 'org.springframework.data.repository.CrudRepository',
    'MongoRepository': 'org.springframework.data.mongodb.repository.MongoRepository',
    'PagingAndSortingRepository': 'org.springframework.data.repository.PagingAndSortingRepository',
    'Repository': 'org.springframework.data.repository.Repository',
};

export interface RepositoryArgs {
    entity: string,
    repository: string,
    id: string,
    package: string,
    name?: string
}
