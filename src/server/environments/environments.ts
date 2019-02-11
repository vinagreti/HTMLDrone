export interface SpaceGPSEnvironment {
  name: string,
  port: number,
}

export const environment: SpaceGPSEnvironment = {
  name: 'local',
  port: 2019,
};
