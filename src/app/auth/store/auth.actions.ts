import * as fromAuth from './auth.reducer';
import { createAction, props } from '@ngrx/store';

export const signIn = createAction('[Auth] Sign In', props<{ accessToken: string }>());
export const resetState = createAction('[Auth] Reset State', props<{ newState: fromAuth.State }>());
export const saveAuthorizationData = createAction('[Auth] Save Authorization Data', props<{ accessToken: string }>());
export const fetchAuthorizationData = createAction('[Auth] Fetch Authorization Data');
export const navigateAfterSuccessfulSigningIn = createAction(
    '[Auth] Navigate After Successful Signing In',
    props<{ path: string }>()
);
