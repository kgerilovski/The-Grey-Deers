import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private router: Router, private af: AngularFireAuth) { }

  signupUser(email: string, password: string) {
    this.af.auth.createUserWithEmailAndPassword(email, password)
    .then((success) => {
      let user: any = this.af.auth.currentUser;
      user.sendEmailVerification().then(
        (success) => {
          alert('Please verify your email.');
      })})
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
      })})
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
      })})
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
