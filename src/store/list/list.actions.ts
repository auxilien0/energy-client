import { ListCars } from '../../../shared/store.interfaces';

export class AddListItem {
  static readonly type = '[List] Add List Item';
  constructor(public readonly payload: ListCars[]) {}
}

export class DeleteListItem {
  static readonly type = '[List] Delete List Item';
  constructor() {}
}
