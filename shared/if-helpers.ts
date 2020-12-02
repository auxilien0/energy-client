import { SearchType } from './store.interfaces';

export function checkIfKmMatch(kmFrom: string, kmTo: string, mileage: string): boolean {
  if (!!parseInt(kmFrom) && !!parseInt(kmTo)) {
    if (parseInt(kmFrom) <= parseInt(mileage) && parseInt(mileage) <= parseInt(kmTo)) {
      return true;
    }
    return false;
  }
  if (!!parseInt(kmFrom) && parseInt(kmFrom) <= parseInt(mileage)) {
    return true;
  }
  if (!!parseInt(kmTo) && parseInt(mileage) <= parseInt(kmTo)) {
    return true;
  }
  return false;
}


export function checkIfYearMatch(yearFrom: string, yearTo: string, year: string): boolean {
  if (!!parseInt(yearFrom) && !!parseInt(yearTo)) {
    if (parseInt(yearFrom) <= parseInt(year) && parseInt(year) <= parseInt(yearTo)) {
      return true;
    }
    return false;
  }
  if (!!parseInt(yearFrom) && parseInt(yearFrom) <= parseInt(year)) {
    return true;
  }
  if (!!parseInt(yearTo) && parseInt(year) <= parseInt(yearTo)) {
    return true;
  }
  return false;
}


export function checkIfKmAndYearMatch(
  yearFrom: string, yearTo: string, kmFrom: string, kmTo: string, year: string, mileage: string
): boolean {
  if (!!parseInt(yearFrom) && !!parseInt(yearTo) && !!parseInt(kmFrom) && !!parseInt(kmTo)) {
    if (
      parseInt(kmFrom) <= parseInt(mileage) && parseInt(mileage) <= parseInt(kmTo)
      && parseInt(yearFrom) <= parseInt(year) && parseInt(year) <= parseInt(yearTo)
    ) {
      return true;
    }
    return false;
  }
  if (!!parseInt(yearFrom) && !!parseInt(yearTo) && !!parseInt(kmFrom) && !parseInt(kmTo)) {
    if (
      parseInt(yearFrom) <= parseInt(year) && parseInt(year) <= parseInt(yearTo)
      && !!parseInt(kmFrom) && parseInt(kmFrom) <= parseInt(mileage)
    ) {
      return true;
    }
    return false;
  }
  if (!!parseInt(yearFrom) && !!parseInt(yearTo) && !parseInt(kmFrom) && !!parseInt(kmTo)) {
    if (
      parseInt(yearFrom) <= parseInt(year) && parseInt(year) <= parseInt(yearTo)
      && !!parseInt(kmTo) && parseInt(mileage) <= parseInt(kmTo)
    ) {
      return true;
    }
    return false;
  }
  if (!!parseInt(yearFrom) && !parseInt(yearTo) && !!parseInt(kmFrom) && !!parseInt(kmTo)) {
    if (
      parseInt(kmFrom) <= parseInt(mileage) && parseInt(mileage) <= parseInt(kmTo)
      && !!parseInt(yearFrom) && parseInt(yearFrom) <= parseInt(year)
    ) {
      return true;
    }
    return false;
  }
  if (!parseInt(yearFrom) && !!parseInt(yearTo) && !!parseInt(kmFrom) && !!parseInt(kmTo)) {
    if (
      parseInt(kmFrom) <= parseInt(mileage) && parseInt(mileage) <= parseInt(kmTo)
      && !!parseInt(yearTo) && parseInt(year) <= parseInt(yearTo)
    ) {
      return true;
    }
    return false;
  }
  if (!parseInt(yearFrom) && !!parseInt(yearTo) && !parseInt(kmFrom) && !!parseInt(kmTo)) {
    if (
      !!parseInt(kmTo) && parseInt(mileage) <= parseInt(kmTo)
      && !!parseInt(yearTo) && parseInt(year) <= parseInt(yearTo)
    ) {
      return true;
    }
    return false;
  }
  if (!!parseInt(yearFrom) && !parseInt(yearTo) && !!parseInt(kmFrom) && !parseInt(kmTo)) {
    if (
      !!parseInt(yearFrom) && parseInt(yearFrom) <= parseInt(year)
      && !!parseInt(kmFrom) && parseInt(kmFrom) <= parseInt(mileage)
    ) {
      return true;
    }
    return false;
  }
  return false;
}


export function getSearchVal(search: SearchType): string {
  let searchFor = '';
  if (search.keyword && !search.brand.n && !search.model.n) {
    searchFor = search.keyword;
  }
  if (!search.keyword && search.brand.n && !search.model.n) {
    searchFor = search.brand.n;
  }
  if (!search.keyword && !search.brand.n && search.model.n) {
    searchFor = search.model.n;
  }
  if (search.keyword && search.brand.n && !search.model.n) {
    searchFor = `${search.brand.n}+${search.keyword}`;
  }
  if (search.keyword && !search.brand.n && search.model.n) {
    searchFor = `${search.model.n}+${search.keyword}`;
  }
  if (!search.keyword && search.brand.n && search.model.n) {
    searchFor = `${search.brand.n}+${search.model.n}`;
  }
  if (search.keyword && search.brand.n && search.model.n) {
    searchFor = `${search.brand.n}+${search.model.n}+${search.keyword}`;
  }
  if (search.fuel) {
    searchFor = `${searchFor.length ? `${searchFor}+` : ''}${encodeURI(search.fuel)}`;
  }
  return searchFor.replace(/\s/gi, '+');
}
