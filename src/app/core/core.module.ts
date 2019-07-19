import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BASE_URL_TOKEN, BASE_URL, CLIENT_ID_TOKEN, CLIENT_ID } from '../app.config';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../auth/store/auth.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects])
  ],
  exports: [
    StoreModule
  ],
  providers: [
    { provide: BASE_URL_TOKEN, useValue: BASE_URL },
    { provide: CLIENT_ID_TOKEN, useValue: CLIENT_ID }
  ]
})
export class CoreModule { }
