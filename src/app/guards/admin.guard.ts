import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const firestore = inject(Firestore);
  const router = inject(Router);

  return new Promise<boolean>((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.navigate(['/']);
        resolve(false);
        return;
      }

      const userDoc = doc(firestore, `Users/${user.uid}`);
      const snapshot = await getDoc(userDoc);

      if (snapshot.exists() && snapshot.data()['isAdmin']) {
        resolve(true);
      } else {
        router.navigate(['/']);
        resolve(false);
      }
    });
  });
};
