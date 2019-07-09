export const SIGN_IN = 'AUTHORIZE_USER';

export class SignIn {
    readonly type = SIGN_IN;

    constructor(public payload: string) { }
}

export type AuthActions = SignIn;
