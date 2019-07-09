import * as fromAuth from './../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface State {
    auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
    auth: fromAuth.authReducer
};
