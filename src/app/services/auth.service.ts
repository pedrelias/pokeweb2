import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) {}

  // CADASTRAR
  async cadastrar(email: string, senha: string) {
    return await createUserWithEmailAndPassword(this.auth, email, senha);
  }

  // LOGIN
  async login(email: string, senha: string) {
    return await signInWithEmailAndPassword(this.auth, email, senha);
  }

  // SAIR
  async sair() {
    return await this.auth.signOut();
  }
}