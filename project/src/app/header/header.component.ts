import { AuthService } from './../auth/auth.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private cdRef: ChangeDetectorRef) {
    this.authService.user.subscribe(() => {
      cdRef.detectChanges();
    });
  }
  ngOnInit() { }

  onSignOut() {
    this.authService.logout();
  }
}
