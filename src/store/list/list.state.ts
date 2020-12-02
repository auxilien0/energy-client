import { State } from '@ngxs/store';
import { ListCars } from '../../../shared/store.interfaces';
import { Injectable } from '@angular/core';

export interface ListStateModel {
  list?: ListCars[];
}

@Injectable()
@State<ListStateModel>({
  name: 'ListState',
  defaults: {
    list: [],
  }
})

export class ListState {}
