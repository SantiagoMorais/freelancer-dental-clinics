export interface IClientId {
  clientId: string;
}

export interface IProjectId {
  projectId: string;
}

export interface IClientAndProjectId extends IClientId, IProjectId {}
