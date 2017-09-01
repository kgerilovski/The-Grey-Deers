import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  user: Observable<firebase.User>;

  constructor(private router: Router, private af: AngularFireAuth) {
    this.user = af.authState;
  }

  signupUser(email: string, password: string) {
    this.af.auth.createUserWithEmailAndPassword(email, password)
    .then((success) => {
      const user: any = this.af.auth.currentUser;
      user.sendEmailVerification().then(
        () => {
          alert('Please verify your email.');
      });
    });
  }

  signinUser(email: string, password: string) {
    this.af.auth.signInWithEmailAndPassword(email, password)
    .then(response => {
      this.router.navigate(['/']);
      this.af.auth.currentUser.getToken()
      .then((token: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('uid', this.af.auth.currentUser.uid);
        localStorage.setItem('email', this.af.auth.currentUser.email);
      });
    });
  }

  signinGmail() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(response => {
      this.router.navigate(['/']);
      this.af.auth.currentUser.getToken()
      .then((token: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('uid', this.af.auth.currentUser.uid);
        localStorage.setItem('email', this.af.auth.currentUser.email);
      });
    });
  }

  logout() {
    this.af.auth.signOut();
    localStorage.clear();
  }

  getEmail() {
    return localStorage.getItem('email');
  }
  getToken() {
    return localStorage.getItem('token');
  }
  isAuthenticated() {
    return localStorage.getItem('token') != null;
  }
}
