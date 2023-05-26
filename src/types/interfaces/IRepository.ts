export interface IRepository {
  id: number;
  name: string;
  owner: IRepositoryOwner;
  description: string;
  stargazers_count: number;
  watchers_count: number;
  language: string;
}

interface IRepositoryOwner {
  id: number;
  login: string;
  avatar_url: string;
}
