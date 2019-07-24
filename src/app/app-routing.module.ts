import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GameComponent } from './game/game.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './auth/auth-guard.service';

export const enum ROUTING_PATHS {
  EMPTY = '',
  GALLERY = 'gallery',
  GAME = 'game',
  WILD_CARD = '**'
}

const routes: Routes = [
  { path: ROUTING_PATHS.EMPTY, component: HomeComponent, pathMatch: 'full' },
  { path: ROUTING_PATHS.GALLERY, component: GalleryComponent, canActivate: [AuthGuardService] },
  { path: ROUTING_PATHS.GAME, component: GameComponent, canActivate: [AuthGuardService] },
  { path: ROUTING_PATHS.WILD_CARD, component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
