import { t } from '../../shared/language/language';
import { languageConfig } from '../../shared/config';

export enum disabled {
  // @ts-ignore
  CAR = t[languageConfig].header.noResultModels,
}

export enum fuel {
  // @ts-ignore
  CAR = t[languageConfig].header.noResultFuel,
}

export enum year {
  // @ts-ignore
  YEAR_FROM = t[languageConfig].header.yearFromPlaceholder,
  // @ts-ignore
  YEAR_TO = t[languageConfig].header.yearToPlaceholder,
}
