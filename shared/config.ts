export const languageConfig = 'cs';
export const useProxiesWhenFetchingData = true;

export const searchIsOn = true;
export const bannerAreOn = false;
export const configuration = {
  isBazosSearchOn: true,
  isSautoSearchOn: true,
  isAaaautoSearchOn: true,
  isTipCasSearchOn: true,
  isSbazarSearchOn: true,
};

const defaultIp = 'localhost';
const defaultServerPort = '3000';
export const defaultUrls = {
  serverIp: defaultIp,
  serverPort: defaultServerPort,
  local: `http://${defaultIp}${defaultServerPort ? ':'+defaultServerPort : ''}/`,
  corsAnywhere: `http://${defaultIp}${defaultServerPort ? ':'+defaultServerPort : ''}/proxy/`,
  bazosMainUrl: 'https://auto.bazos.cz',
  sAutoGetModels: 'https://www.sauto.cz/ajax/hierarchy?type=model&manufacturer_id=',
  sAutoMainSearchUrl: 'https://www.sauto.cz/hledani?ajax=2&condition=1&condition=4&condition=2&category=1',
  tipCarMainUrl: 'https://www.tipcars.com/',
  getIpAsDataIp: 'https://api.ipify.org/?format=json',
  aaaAutoMainSearchUrl: 'https://www.aaaauto.cz/cz/cars.php?carlist=1',
  bazosMini: 'https://auto.bazos.cz',
  sAutoMini: 'https://www.sauto.cz',
  aaaAutoMini: 'https://www.aaaauto.cz',
  tipCarsMini: 'https://www.tipcars.com',
  sbazarMini: 'https://www.sbazar.cz/170-osobni-auta',
  sbazarMainUrl: 'https://www.sbazar.cz/api/v1/items/search',
  listProxyListCountries: ['https://spys.one/europe-proxy/', 'DE', 'UK', 'CZ'],
  listProxyUrl: 'https://spys.one/free-proxy-list/'
};
