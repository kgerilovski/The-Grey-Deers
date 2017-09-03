import { OfferService } from './offer/offer.service';
import { AuthService } from './auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth/auth-guard.service';
import { RequestComponent } from './offer/request/request.component';
import { ManageComponent } from './offer/manage/manage.component';
import { ApproveComponent } from './offer/approve/approve.component';
import { ModalModule } from 'ng2-bootstrap';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'manage', component: ManageComponent, canActivate: [AuthGuard] },
  { path: 'request', component: RequestComponent, canActivate: [AuthGuard] },
  { path: 'approve', component: ApproveComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent }
 ];

 export const firebaseConfig = {
  apiKey: 'AIzaSyDkcWWpfMP03vRrWJhl24MXG56grlXurRQ',
  authDomain: 'the-grey-deers.firebaseapp.com',
  databaseURL: 'https://the-grey-deers.firebaseio.com',
  projectId: 'the-grey-deers',
  storageBucket: 'the-grey-deers.appspot.com',
  messagingSenderId: '114242608796'
  };

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    RequestComponent,
    ManageComponent,
    ApproveComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [AuthService, AngularFireAuth, AuthGuard, AngularFireDatabase, OfferService],
  bootstrap: [AppComponent]
})
export class AppModule { }
