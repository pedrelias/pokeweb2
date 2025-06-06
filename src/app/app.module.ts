import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { HomeComponent } from './pages/home/home.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CreateProfileComponent } from './tools/create-profile/create-profile.component';
import { ListUsersComponent } from './tools/admin/list-users/list-users.component';
import { RouterModule } from '@angular/router';
import { CadastroPokemonComponent } from './tools/admin/cadastro-pokemon/cadastro-pokemon.component';
import { CaptureComponent } from './pages/capture/capture.component';
import { PokedexComponent } from './tools/admin/pokedex/pokedex.component';
import { HttpClientModule } from '@angular/common/http';
import { BagComponent } from './pages/bag/bag.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';



@NgModule({
  declarations: [
    AppComponent,
    AuthenticatorComponent,
    HomeComponent,
    EmailVerificationComponent,
    MainPageComponent,
    CreateProfileComponent,
    ListUsersComponent,
    CadastroPokemonComponent,
    CaptureComponent,
    PokedexComponent,
    BagComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideClientHydration(withEventReplay()),
    provideAuth(() => getAuth()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
