import { Component, inject } from '@angular/core';
import { Auth, User, authState, signOut } from '@angular/fire/auth';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pokeweb2';
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  userHasProfile = true;
  private static userDocument: UserDocument | null = null;
  private authSubscription: Subscription | null = null;
  

  constructor(
    private loginSheet: MatBottomSheet,
    private router: Router
  ) {
    this.setupAuthListener();
  }

  private setupAuthListener() {
    this.authSubscription = authState(this.auth).subscribe(user => {
      if (!user) {
        AppComponent.userDocument = null;
        return;
      }

      if (!user.emailVerified && this.router.url !== '/emailVerification') {
        this.router.navigate(["emailVerification"]);
        return;
      }

      this.getUserProfile(user);
    });
  }

  public static getUserDocument(): UserDocument | null {
    return AppComponent.userDocument;
  }

  getUsername(): string | undefined {
    return AppComponent.userDocument?.publicName;
  }

  async getUserProfile(user: User): Promise<void> {
    const userDocRef = doc(this.firestore, 'Users', user.uid);

    onSnapshot(userDocRef, (snapshot) => {
      if (snapshot.exists()) {
        
        AppComponent.userDocument = {
          ...(snapshot.data() as UserDocument),
          userId: user.uid
        };
        this.userHasProfile = true;
        const isAdmin = Boolean(AppComponent.userDocument.isAdmin);
        const currentRoute = this.router.getCurrentNavigation()?.finalUrl?.toString() || this.router.url;

        if (isAdmin) {
          if (!currentRoute.includes('/list-users')) {
            this.router.navigate(["list-users"]);
          }
        } else {
          if (!currentRoute.includes('/main-page')) {
            this.router.navigate(["main-page"]);
          }
        }
        
      } else {
        this.userHasProfile = false;
      }
    });
  }

  async onLogoutClick() {
    try {
      await signOut(this.auth);
      this.router.navigate([""]);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  loggedIn(): boolean {
    return !!this.auth.currentUser;
  }

  onLoginClick() {
    this.loginSheet.open(AuthenticatorComponent);
  }

  isAdmin(): boolean {
    return AppComponent.userDocument?.isAdmin ?? false;
  }

  isHunter(): boolean {
    return AppComponent.userDocument?.isHunter ?? false;
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }
}

export interface UserDocument {
  publicName: string;
  description: string;
  userId: string;
  isAdmin?: boolean; 
  isHunter?: boolean; 
}