import { ListStateModel } from './list.state';
import { Selector, Action, StateContext } from '@ngxs/store';
import { ListCars} from '../../../shared/store.interfaces';
import { AddListItem, DeleteListItem } from './list.actions';

export class ListState {
  @Selector() static SelectAllItems(state: ListStateModel): ListCars[] {
    return state.list;
  }

  @Action(AddListItem)
  addListItem(
    { getState, setState }: StateContext<ListStateModel>,
    { payload }: AddListItem
  ) {
    const state = getState();
    const allListCars = [...(state?.list || []), ...payload];
    setState({
      list: allListCars,
    });
  }

  @Action(DeleteListItem)
  deleteListItem(
    { getState, setState }: StateContext<ListStateModel>,
  ) {
    const state = getState();
    setState({
      ...state,
      list: []
    });
  }
}
