import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const getAuthState = createFeatureSelector('auth');
export const getAccessToken = createSelector(getAuthState, (authState: fromAuth.State) => authState.accessToken);
