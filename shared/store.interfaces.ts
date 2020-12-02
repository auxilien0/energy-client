export interface ListCars {
  path: string;
  mode: string;
  type: string;
  sha: string;
  size: number;
  url: string;
}

export const token = '69932e14f25f7a587af6c8ff520edb95afd9dffa';

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
