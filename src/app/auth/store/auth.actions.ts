import * as fromAuth from './auth.reducer';

export const SIGN_IN = 'AUTHORIZE_USER';
export const NAVIGATE_AFTER_SUCCESSFUL_SIGNING_IN = 'NAVIGATE_AFTER_SUCCESSFUL_SIGNING_IN';
export const RESET_STATE = 'UPDATE_STORE';
export const SAVE_AUTHORIZATION_DATA = 'SAVE_AUTHORIZATION_DATA';

export class SignIn {
    readonly type = SIGN_IN;
    constructor(public payload: string) { }
}

export class NavigateAfterSuccessfulSigningIn {
    readonly type = NAVIGATE_AFTER_SUCCESSFUL_SIGNING_IN;
    constructor(public payload: string) { }
}

export class ResetState {
    readonly type = RESET_STATE;
    constructor(public payload: fromAuth.State) { }
}

export class SaveAuthorizationData {
    readonly type = SAVE_AUTHORIZATION_DATA;
    constructor(public payload: string) { }
}

export type AuthActions =
    SignIn |
    NavigateAfterSuccessfulSigningIn |
    ResetState |
    SaveAuthorizationData;
