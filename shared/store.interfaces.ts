export interface ListCars {
  path: string;
  mode: string;
  type: string;
  sha: string;
  size: number;
  url: string;
}

export const token = '5c7b08a1dec93a484aaf11810fe491b43b38b8ca';

export const htmlGithubApi = 'https://api.github.com/repos/auxilien0/countenergy';

export const githubAuthorizationHeader = {
  headers: {
    Authorization: `token ${token}`,
  }
};

export const rawDataFile = (filePath: string) => {
  const x = `${htmlGithubApi}/contents/${filePath}`;
  console.log('x :>> ', x);
  return x;
}
