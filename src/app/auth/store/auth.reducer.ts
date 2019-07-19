import * as fromAuthActions from './auth.actions';

export interface State {
    accessToken: string;
    isAuthenticated: boolean;
}

export const initialState: State = {
    accessToken: null,
    isAuthenticated: false
};

export function authReducer(state: State = initialState, action: fromAuthActions.AuthActions) {
    switch (action.type) {
        case fromAuthActions.SIGN_IN:
            return {
                ...state,
                accessToken: action.payload,
                isAuthenticated: true
            }
        default:
            return state;
    }
}
