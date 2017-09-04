import { OfferService } from './../offer.service';
import { RequestOffer } from './../offer.model';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {

  request$: Observable<RequestOffer[]> ;
  constructor(private offerService: OfferService) {
     this.request$ = offerService.getOffersByStatus('new');
 }
 ngOnInit() {
 }

}
