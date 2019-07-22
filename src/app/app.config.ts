import { environment } from 'src/environments/environment';
import { InjectionToken } from '@angular/core';

export const APP_BASE_URL: string = environment.baseUrl;
export const APP_BASE_URL_TOKEN: InjectionToken<string> = new InjectionToken(APP_BASE_URL);

export const CLIENT_ID = 'bf110e2b486a4ea4bb499137be2b13fc';
export const CLIENT_ID_TOKEN: InjectionToken<string> = new InjectionToken(CLIENT_ID);

export const INSTAGRAM_API_BASE_URL = 'https://api.instagram.com/';
export const INSTAGRAM_API_BASE_URL_TOKEN: InjectionToken<string> = new InjectionToken(INSTAGRAM_API_BASE_URL);
