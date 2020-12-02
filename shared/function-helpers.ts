import { regexYearBackUp, regexYear, Constants } from './utils';
import { ListCars, SearchType } from './store.interfaces';
import { t as lang } from '../shared/language/language';
import { languageConfig, defaultUrls } from './config';
import { BazosType } from '../src/app/search-result/search-web/bazos';
import { AaaautoType } from '../src/app/search-result/search-web/aaaauto';

const t = lang[languageConfig];

export const elementId = 'elementId';

export const LovedList = 'lovedList';


export function searKeywordMatchExcept(keyword: string): Array<string> | null {
  return keyword.match(/(?<=-)[a-zA-Z0-9ÆÐƎƏƐƔĲŊŒẞÞǷȜæðǝəɛɣĳŋœĸſßþƿȝĄƁÇĐƊĘĦĮƘŁØƠŞȘŢȚŦŲƯY̨Ƴąɓçđɗęħįƙłøơşșţțŧųưy̨ƴÁÀÂÄǍĂĀÃÅǺĄÆǼǢƁĆĊĈČÇĎḌĐƊÐÉÈĖÊËĚĔĒĘẸƎƏƐĠĜǦĞĢƔáàâäǎăāãåǻąæǽǣɓćċĉčçďḍđɗðéèėêëěĕēęẹǝəɛġĝǧğģɣĤḤĦIÍÌİÎÏǏĬĪĨĮỊĲĴĶƘĹĻŁĽĿʼNŃN̈ŇÑŅŊÓÒÔÖǑŎŌÕŐỌØǾƠŒĥḥħıíìiîïǐĭīĩįịĳĵķƙĸĺļłľŀŉńn̈ňñņŋóòôöǒŏōõőọøǿơœŔŘŖŚŜŠŞȘṢẞŤŢṬŦÞÚÙÛÜǓŬŪŨŰŮŲỤƯẂẀŴẄǷÝỲŶŸȲỸƳŹŻŽẒŕřŗſśŝšşșṣßťţṭŧþúùûüǔŭūũűůųụưẃẁŵẅƿýỳŷÿȳỹƴźżžẓ]+/g);
}


export function changeRowsNumDueToPriceFrom(
  priceFrom: string,
  yearIsPresent: boolean,
  fuel: boolean,
): number {
  const priceFromParsed = !!priceFrom.length ? parseInt(priceFrom, 10) : 0;
  if (priceFromParsed < 14999) {
    return yearIsPresent ? 10 : 5;
  }
  if (priceFromParsed < 24999) {
    return yearIsPresent ? 8 : 4;
  }
  if (fuel) {
    return yearIsPresent ? 7 : 3;
  }
  return yearIsPresent ? 6 : 3;
}


export function findMileageInText(title: string, description: string): string | undefined {
  function removeAllDots(text: string): string {
    return text.replace(/(\.|\s)/gi, '');
  }
  function isNotAllTheSame(arrB: RegExpMatchArray) {
    const arr = arrB.filter(valB => {
      const val = !!valB ? valB.replace(/\s/gi, '') : '';
      return !!val;
    });
    return arr.length === 1 || arr.length !== 0 || !arr.every(val => {
      return val === arr[0]
    });
  }
  function removeUnneededElements(arr: RegExpMatchArray) {
    const xx = arr.filter(Boolean)?.filter(a => a.length >= 2);
    if (xx.length) {
      const yy = xx[0].trim().split(/\r?\n/);
      return yy[yy.length - 1];
    } else {
      return undefined;
    }
  }
  const regexStart = /(?<=(najeto|najeto\s|najeto:|najeto:\s|najazd:|najazd:\s|nájezdem|nájezdem\s|nájezdem:|nájezdem:\s|najeto\spouze|najeto\spouze\s|najeto\spouze:|najeto\spouze:\s))[0-9.\s]{0,10}/gi;
  const regexEnd = /[0-9.\s]{0,10}(?=(tkm|km|\stkm|\skm|tis.km|\stis.km|tis. km|\stis. km))/gi;
  const titleMatchStart = title.match(regexStart);
  const titleMatchEnd = title.match(regexEnd);
  const descriptionMatchStart = description.match(regexStart);
  const descriptionMatchEnd = description.match(regexEnd);
  if (!!titleMatchStart && isNotAllTheSame(titleMatchStart)) {
    const titRes = removeUnneededElements(titleMatchStart);
    if (!titRes) {
      return undefined;
    }
    if (titRes.length < 5) {
      return `${removeAllDots(titRes)}000`;
    }
    return removeAllDots(titRes);
  }
  if (!!descriptionMatchStart && isNotAllTheSame(descriptionMatchStart)) {
    const desRes = removeUnneededElements(descriptionMatchStart);
    if (!desRes) {
      return undefined;
    }
    if (desRes.length < 5) {
      return `${removeAllDots(desRes)}000`;
    }
    return removeAllDots(desRes);
  }
  if (!!titleMatchEnd && isNotAllTheSame(titleMatchEnd)) {
    const titRes = removeUnneededElements(titleMatchEnd);
    if (!titRes) {
      return undefined;
    }
    if (titRes.length < 5) {
      return `${removeAllDots(titRes)}000`;
    }
    return removeAllDots(titRes);
  }
  if (!!descriptionMatchEnd && isNotAllTheSame(descriptionMatchEnd)) {
    const desRes = removeUnneededElements(descriptionMatchEnd);
    if (!desRes) {
      return undefined;
    }
    if (desRes.length < 5) {
      return `${removeAllDots(desRes)}000`;
    }
    return removeAllDots(desRes);
  }
  return undefined;
}


export function findYearMade(title: string, description: string): string | undefined {
  function checkIfBetweenYears(value: string) {
    return String(new Date().getFullYear()) >= value && value >= '1900';
  }
  function sliceTrimReplace(value: string) {
    const valueSplitDot = value.trim().replace(/[^0-9.\/-]/, '').split('.');
    const valueSplitSlice = valueSplitDot[valueSplitDot.length - 1].split('/');
    const valueSplitLine = valueSplitSlice[valueSplitSlice.length - 1].split('-');
    const valueSplitSpace = valueSplitLine[valueSplitLine.length - 1].split(' ');
    return valueSplitSpace[valueSplitSpace.length - 1].trim().replace(/[^0-9]/gi, '');
  }
  function createDoubleNumber(value: string) {
    const parsedValue = parseInt(value);
    const date = (new Date().getFullYear()).toString().split('');
    const twoDigitsFromDate = parseInt(`${date[2]}${date[3]}`);
    if (parsedValue === 0 || parsedValue < 100 && twoDigitsFromDate < parsedValue) {
      return `19${value}`;
    } else {
      return `20${value}`;
    }
  }
  const tmpArrRegex = createTmpRegex(regexYear);
  const tmpArrBackUpRegex = createTmpRegex(regexYearBackUp);
  const regex = new RegExp(`((${tmpArrRegex.join('|')})([12][09][0-9][0-9]))`, 'gi');
  const matchBackup = new RegExp(`((${tmpArrBackUpRegex.join('|')})([12][09][0-9][0-9]))`, 'gi');
  const matchBackupDouble = new RegExp(`((${tmpArrRegex.join('|')})([0-9][0-9]))`, 'gi');
  const titleMatch = title.match(regex);
  const descriptionMatch = description.match(regex);
  const titleMatchBackUp = title.match(matchBackup);
  const descriptionMatchBackUp = description.match(matchBackup);
  const titleMatchBackUpDouble = title.match(matchBackupDouble);
  const descriptionMatchBackUpDouble = description.match(matchBackupDouble);
  if (descriptionMatch && descriptionMatch.length) {
    const description = sliceTrimReplace(descriptionMatch[0]);
    if (checkIfBetweenYears(description)) {
      return description;
    }
  }
  if (titleMatch && titleMatch.length) {
    const title = sliceTrimReplace(titleMatch[0]);
    if (checkIfBetweenYears(title)) {
      return title;
    }
  }
  if (descriptionMatchBackUp && descriptionMatchBackUp.length) {
    const description = sliceTrimReplace(descriptionMatchBackUp[0]);
    if (checkIfBetweenYears(description)) {
      return description;
    }
  }
  if (titleMatchBackUp && titleMatchBackUp.length) {
    const title = sliceTrimReplace(titleMatchBackUp[0]);
    if (checkIfBetweenYears(title)) {
      return title;
    }
  }
  if (descriptionMatchBackUpDouble && descriptionMatchBackUpDouble.length) {
    const description = createDoubleNumber(sliceTrimReplace(
      descriptionMatchBackUpDouble[0])
    );
    if (checkIfBetweenYears(description)) {
      return description;
    }
  }
  if (titleMatchBackUpDouble && titleMatchBackUpDouble.length) {
    const title = createDoubleNumber(sliceTrimReplace(titleMatchBackUpDouble[0]));
    if (checkIfBetweenYears(title)) {
      return title;
    }
  }
  return undefined;
}
function createTmpRegex(regexYear: string[]) {
  const tmpArrRegex = [];
  for (const reg of regexYear) {
    tmpArrRegex.push(`${reg}`);
    tmpArrRegex.push(`${reg}:`);
    tmpArrRegex.push(`${reg}\\s`);
    tmpArrRegex.push(`${reg}\/`);
    tmpArrRegex.push(`${reg}\.`);
    tmpArrRegex.push(`${reg}:\\s`);
    tmpArrRegex.push(`${reg}\/\\s`);
    tmpArrRegex.push(`${reg}\.\\s`);
    tmpArrRegex.push(`${reg}\\s[0-9]\.`);
    tmpArrRegex.push(`${reg}\\s[0-9]\/`);
    tmpArrRegex.push(`${reg}\\s[01][0-9]\.`);
    tmpArrRegex.push(`${reg}\\s[01][0-9]\/`);
    tmpArrRegex.push(`${reg}\\s[12]\.[0-9]\.`);
    tmpArrRegex.push(`${reg}\\s[12]\/[0-9]\/`);
    tmpArrRegex.push(`${reg}:\\s[0-9]\.`);
    tmpArrRegex.push(`${reg}:\\s[0-9]\/`);
    tmpArrRegex.push(`${reg}:\\s[01][0-9]\.`);
    tmpArrRegex.push(`${reg}:\\s[01][0-9]\/`);
    tmpArrRegex.push(`${reg}:\\s[12]\.[0-9]\.`);
    tmpArrRegex.push(`${reg}:\\s[12]\/[0-9]\/`);
    tmpArrRegex.push(`${reg}\/\\s[0-9]\.`);
    tmpArrRegex.push(`${reg}\/\\s[0-9]\/`);
    tmpArrRegex.push(`${reg}\/\\s[01][0-9]\.`);
    tmpArrRegex.push(`${reg}\/\\s[01][0-9]\/`);
    tmpArrRegex.push(`${reg}\/\\s[12]\.[0-9]\.`);
    tmpArrRegex.push(`${reg}\/\\s[12]\/[0-9]\/`);
    tmpArrRegex.push(`${reg}[0-9]\.`);
    tmpArrRegex.push(`${reg}[0-9]\/`);
    tmpArrRegex.push(`${reg}[01][0-9]\.`);
    tmpArrRegex.push(`${reg}[01][0-9]\/`);
    tmpArrRegex.push(`${reg}[01]\.[0-9]\.`);
    tmpArrRegex.push(`${reg}[01]\/[0-9]\/`);
  }
  return tmpArrRegex;
}


export function getDOMBetweenBody(body: string | undefined) {
  if (!!body) {
    const bodyMatch = body.match(/<body((.|\n|\r)*?)<\/body>/gi);
    if (!!bodyMatch) {
      return bodyMatch[0];
    } else {
      return '';
    }
  } else {
    return '';
  }
}

export function splitInDots(value: string) {
  function reverseNumber(input: string | undefined) {
    return [].map.call(input, function(x) {
      return x;
    }).reverse().join(''); 
  }
  
  function plainNumber(number: string) {
    return number.split('.').join('');
  }
  const plain = plainNumber(value),
  reversed = reverseNumber(plain),
  reversedWithDots = reversed?.match(/.{1,3}/g)?.join(' '),
  finalNumber = reverseNumber(reversedWithDots);
  return finalNumber;
}

export function toLowerCaseAndReplace(value: string) {
  return value.toLocaleLowerCase().replace(/\s/gi, '-');
}

export function getLovedList(): Array<ListCars> {
  const lovedList = localStorage.getItem(LovedList);
  return !!lovedList ? JSON.parse(lovedList) : [];
}

export function setToLovedList(list: ListCars) {
  const lovedList = localStorage.getItem(LovedList);
  if (!!lovedList) {  
    const parsedLovedList: ListCars[] = JSON.parse(lovedList);
    return localStorage.setItem(LovedList, JSON.stringify([...parsedLovedList, list]));
  } else {
    return localStorage.setItem(LovedList, JSON.stringify([list]));
  }
}

export function removeFromLovedList(removeAuto: ListCars) {
  const lovedList = localStorage.getItem(LovedList);
  if (!!lovedList) {
    const parsedLovedList: ListCars[] = JSON.parse(lovedList);
    const foundAutoToRemoveIndex = parsedLovedList.findIndex(
      auto => auto.createdBy === removeAuto.createdBy
    );
    if (foundAutoToRemoveIndex !== -1) {
      parsedLovedList.splice(foundAutoToRemoveIndex, 1);
      localStorage.setItem(
        LovedList,
        JSON.stringify(parsedLovedList),
      );
    }
  }
}

export function isExistsInLovedList(auto: ListCars): boolean {
  const lovedList = localStorage.getItem(LovedList);
  if (lovedList) {
    const parsedLovedList: ListCars[] = JSON.parse(lovedList);
    const foundAuto = parsedLovedList.find(
      autoFromList => auto.createdBy === autoFromList.createdBy
    );
    return !!foundAuto;
  }
  return false;
}

export function removeAllFromLoveList() {
  localStorage.setItem(LovedList, JSON.stringify([]));
}

export function customNormalize(inStr: string) {
  return inStr.replace(
    /([àáâãäå])|([çčć])|([èéêëě])|([ìíîï])|([ñň])|([òóôõöø])|([ßš])|([ùúûüů])|([ÿ])|([æ])|([ď])|([ř])|([ť])|([ž])/gi, 
    // @ts-ignore
    function (str, a, c, e, i, n, o, s, u, y, ae, d, r, t, z) {
      if (undefined) {
        return '';
      }
      if (a) return 'a';
      if (c) return 'c';
      if (e) return 'e';
      if (i) return 'i';
      if (n) return 'n';
      if (o) return 'o';
      if (s) return 's';
      if (u) return 'u';
      if (y) return 'y';
      if (ae) return 'ae';
      if (d) return 'd';
      if (r) return 'r';
      if (t) return 't';
      if (z) return 'z';
    }
  );
}

export function removeNotDigits(value: string) {
  return value.replace(/[^0-9]/gi, '');
}

export function checkIfSearchNotUseForbidenStrings(
  search: SearchType | string, searchIsString?: boolean
): boolean {
  let reqIsForbiden = false;
  const forbidenRegex = /\<|\>|\[|\]/gi;
  if (searchIsString && typeof search === 'string') {
    if (!!search && search.match(forbidenRegex)) {
      reqIsForbiden = true;
    }
  } else {
    for (const value of (Object.values(search) as string[])) {
      const defaultValue = !value
        ? undefined
        : typeof value === 'string'
          ? value
          : Object.values(value) as string[];
      if (!!defaultValue) {
        if (Array.isArray(defaultValue)) {
          for (const v of defaultValue) {
            if (!!v && String(v).match(forbidenRegex)) {
              reqIsForbiden = true;
              break;
            }
          }
        } else {
          if (!!value && String(value).match(forbidenRegex)) {
            reqIsForbiden = true;
            break;
          }
        }
      }
    }
  }
  return reqIsForbiden;
}

export function checkIfThereIsSomeDevider(x: number, carList: ListCars[]) {
  let isThere = false;
  for (let y = x; y - 19 > x; y++) {
    console.log('y, x :>> ', y, x);
    if (!carList[y].isItCardDevider) {
      isThere = true
      break;
    }
  }
  return isThere;
}

export function createMileage(mileage?: string) {
  if (!mileage) {
    return '?';
  }
  const mileageNum = parseInt(mileage),
  division = mileageNum / 1000;
  if (division < 1000 && division >= 1) {
    return `${Math.round(division)} 000 ${t.header.kmOrMil}`;
  } else if (division >= 1000) {
    return `${Math.floor(division / 1000)} 000 000 ${t.header.kmOrMil}`;
  }
  return `${mileage} ${t.header.kmOrMil}`;
}


export function createLink(i: number, listItems: ListCars[]) {
  const type = typeof listItems[i + 1] !== 'undefined' ? listItems[i + 1].type : '';
  if (type === 'bazoš') {
    return defaultUrls.bazosMini;
  } else if (type === 'sauto') {
    return defaultUrls.sAutoMini;
  } else if (type === 'aaaauto') {
    return defaultUrls.aaaAutoMini;
  } else if (type === 'tipCars') {
    return defaultUrls.tipCarMainUrl;
  } else if (type === 'sbazar') {
    return defaultUrls.sbazarMini;
  }
  return '';
}


export async function resolveOrStop(res: Promise<ListCars[] | BazosType | AaaautoType>) {
  let resolved: ListCars[] | BazosType | AaaautoType = [];
  try {
    await new Promise(async (resolve) => {
      let isAlreadyRunOver = false;
      setTimeout(() => {
        if (!isAlreadyRunOver) {
          isAlreadyRunOver = true;
          resolve();
        }
      }, 10000, []);
      let result = await res;
      isAlreadyRunOver = true;
      resolved = result;
      resolve();
    })
  } catch (error) {
    console.log('resolveOrStop', error);
  }
  return resolved;
}


export function createPrice(price: string) {
  if (!price) {
    return price;
  }
  if (!!price.match(/((.*)zdarma(.*)|(.*)dohodou(.*))/gi)) {
    return price;
  }
  return `${splitInDots(price)} ${t.header.currentCurrency}`;
}


export function removeFromTheListOfCompanies(company: string, companiesNotLoaded: string[]) {
  const indexOfCompany = companiesNotLoaded.findIndex(c => c === company);
  if (indexOfCompany) {
    companiesNotLoaded.splice(indexOfCompany, 1);
  }
  return companiesNotLoaded;
}




// UNUSED - NOT USE IT IN THIS DOCUMENT !!

export function openAndCloseMenu() {
  // let prevScrollpos = window.pageYOffset;
  // window.onscroll = () => {
  //   if (window.innerWidth <= Constants.customWidth) {
  //     return;
  //   }
  //   const currentScrollPos = window.pageYOffset;
  //   if (
  //     currentScrollPos < 100
  //     ||
  //     prevScrollpos > currentScrollPos
  //     && !this.buttonClicked
  //   ) {
  //     document.getElementById('openingButton').style.display = 'none';
  //     document.getElementById('toolbar').style.top = "0";
  //   } else if (!this.buttonClicked) {
  //     document.getElementById('openingButton').style.display = 'block';
  //     document.getElementById('toolbar').style.top = "-300px";
  //     this.mapToggle = false;
  //   }
  //   console.log('scroll');
  //   prevScrollpos = currentScrollPos;
  // };
};
