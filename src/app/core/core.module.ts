import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromAppConfig from '../app.config';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../auth/store/auth.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth/auth.service';
import { AuthGuardService } from '../auth/auth-guard.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 15
    })
  ],
  providers: [
    { provide: fromAppConfig.APP_BASE_URL_TOKEN, useValue: fromAppConfig.APP_BASE_URL },
    { provide: fromAppConfig.CLIENT_ID_TOKEN, useValue: fromAppConfig.CLIENT_ID },
    { provide: fromAppConfig.INSTAGRAM_API_BASE_URL_TOKEN, useValue: fromAppConfig.INSTAGRAM_API_BASE_URL },
    CookieService,
    AuthService,
    AuthGuardService
  ]
})
export class CoreModule { }
