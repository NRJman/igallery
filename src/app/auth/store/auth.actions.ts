export const SIGN_IN = 'AUTHORIZE_USER';
export const NAVIGATE_AFTER_SUCCESSFUL_SIGNING_IN = 'NAVIGATE_AFTER_SUCCESSFUL_SIGNING_IN';

export class SignIn {
    readonly type = SIGN_IN;
    constructor(public payload: string) { }
}

export class NavigateAfterSuccessfulSigningIn {
    readonly type = NAVIGATE_AFTER_SUCCESSFUL_SIGNING_IN;
}

export type AuthActions = SignIn | NavigateAfterSuccessfulSigningIn;
