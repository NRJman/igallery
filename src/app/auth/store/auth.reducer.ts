import * as fromAuthActions from './auth.actions';

export interface State {
    clientId: string;
    accessToken: string;
    isAuthenticated: boolean;
}

export const initialState: State = {
    clientId: 'bf110e2b486a4ea4bb499137be2b13fc',
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
            };
        default:
            return state;
    }
}
