import * as AuthActions from './auth.actions';
import { Action, createReducer, on } from '@ngrx/store';

export interface State {
    accessToken: string;
    isAuthenticated: boolean;
}

export const initialState: State = {
    accessToken: null,
    isAuthenticated: false
};

export function authReducer(authState: State | undefined, authAction: Action) {
    return createReducer(
        initialState,
        on(AuthActions.signIn, (state, action) => ({
            ...state,
            accessToken: action.accessToken,
            isAuthenticated: true
        })),
        on(AuthActions.resetState, (state, action) => ({
            ...state,
            accessToken: action.newState.accessToken,
            isAuthenticated: action.newState.isAuthenticated
        }))
    )(authState, authAction);
}
