import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CreateProfileComponent } from './tools/create-profile/create-profile.component';
import { ListUsersComponent } from './tools/admin/list-users/list-users.component';
import { CadastroPokemonComponent } from './tools/admin/cadastro-pokemon/cadastro-pokemon.component';
import { CaptureComponent } from './pages/capture/capture.component';
import { PokedexComponent } from './tools/admin/pokedex/pokedex.component';
import { BagComponent } from './pages/bag/bag.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {path: "", component: HomeComponent}, 
  {path: "email-verification", component: EmailVerificationComponent},
  {path: "create-profile", component: CreateProfileComponent, canActivate: [authGuard]},
  {path: "main-page", component: MainPageComponent, canActivate: [authGuard]},
  {path: "list-users", component: ListUsersComponent, canActivate: [authGuard, adminGuard]},
  {path: "cadastro-pokemon", component: CadastroPokemonComponent, canActivate: [authGuard, adminGuard]},
  {path: "capture", component: CaptureComponent, canActivate: [authGuard]},
  {path: "pokedex", component: PokedexComponent, canActivate: [authGuard]},
  {path: "bag", component: BagComponent, canActivate: [authGuard]},
  {path: "user-profile", component: UserProfileComponent, canActivate: [authGuard]},
  {path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
