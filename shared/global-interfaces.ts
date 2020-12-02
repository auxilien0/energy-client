import { ListCars } from './store.interfaces';

export interface EmailBodyType {
  emailTo: string;
  data: string;
}

export interface ProxyInter {
  host: string;
  port: number;
}

export interface OptionsRequest {
  headers?: {
    'X-Forwarded-For': string;
    'X-Forwarded-Port'?: number;
  };
  proxy?: ProxyInter,
  cancelToken?: any,
}
