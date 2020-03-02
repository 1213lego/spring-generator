export interface Repository {
    name: string;
    value: {
        name: string,
        package: string
    };
}

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

function getRepositories(): Array<Repository> {
    return Object.keys(repositoriePackages)
        .map((key) => {
            return {
                name: key, value: {
                    name: key, package: repositoriePackages[key]
                }
            }
        });
}

export interface RepositoryArgs {
    entity: string,
    repository: string,
    id: string,
    package: string,
    name?: string
}


export const repositoryChoices: Array<Repository> = getRepositories();