import { OfferService } from './../offer.service';
import { Offer, Request, RequestOffer } from './../offer.model';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {

  requests$: Observable<RequestOffer[]>;
  constructor(private offerService: OfferService) {
     this.requests$ = offerService.getOffersByStatus('new');
 }
 ngOnInit() {
 }

}
