import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CreateProfileComponent } from './tools/create-profile/create-profile.component';
import { ListUsersComponent } from './tools/admin/list-users/list-users.component';
import { CadastroPokemonComponent } from './tools/admin/cadastro-pokemon/cadastro-pokemon.component';
import { CaptureComponent } from './pages/capture/capture.component';

export const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "email-verification", component: EmailVerificationComponent},
  {path: "create-profile", component: CreateProfileComponent},
  {path: "main-page", component: MainPageComponent},
  {path: "list-users", component: ListUsersComponent, canActivate: []},
  {path: "cadastro-pokemon", component: CadastroPokemonComponent, canActivate: []},
  {path: "capture", component: CaptureComponent},
  {path: "**", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
