import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  user: Observable<firebase.User>;
  token: String;

  constructor(private router: Router, private af: AngularFireAuth) {
    this.user = af.authState;

    this.user.subscribe((user) =>
      user ? user.getToken()
      .then((token: string) => this.token = token) : 0
    );
  }

  signupUser(email: string, password: string) {
    this.af.auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      this.router.navigate(['/']);
      this.af.auth.currentUser.sendEmailVerification()
      .then(() => alert('Please verify your email.'));
    });
  }

  signinUser(email: string, password: string) {
    this.af.auth.signInWithEmailAndPassword(email, password)
    .then(response => this.router.navigate(['/']));
  }

  signinGmail() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(response => this.router.navigate(['/']));
  }

  logout() {
    this.af.auth.signOut();
  }

  getEmail() {
    return this.af.auth.currentUser.email;
  }
  getToken() {
    return this.token;
  }
  isAuthenticated(): boolean {
    return this.af.auth.currentUser ? true : false;
  }
}
