import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as FromAuth from './auth.reducer';

export const getAuthState = createFeatureSelector('auth');
export const getAccessToken = createSelector(getAuthState, (authState: FromAuth.State) => authState.accessToken);
export const getIsAuthenticated = createSelector(getAuthState, (authState: FromAuth.State) => authState.isAuthenticated);
