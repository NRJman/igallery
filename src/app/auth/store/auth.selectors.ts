import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const getAuthState = createFeatureSelector('auth');
export const getClientId = createSelector(getAuthState, (authState: fromAuth.State) => authState.clientId);
