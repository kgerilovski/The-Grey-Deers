import { AuthService } from './../../auth/auth.service';
import { OfferService } from './../offer.service';
import { Offer, Request } from './../offer.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  offerList: Offer[] = [];

  constructor(private inventoryService: OfferService, private authService: AuthService) {
    inventoryService.getAllOffers().subscribe(
        data => this.offerList = data
      );
    }

  ngOnInit() {
  }

  onRequestOffer($key: string) {
    const request = new Request(this.authService.getEmail(), $key, 'new');
    this.inventoryService.requestOffer(request);
  }

}
