import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Offer, Request } from './offer.model';
import 'rxjs/add/operator/map';
 
@Injectable()
export class OfferService {
offer: Offer ;
offers: FirebaseListObservable<any[]>;
requests: FirebaseListObservable<any[]>;
constructor(private db: AngularFireDatabase) {
this.offers = this.db.list('/offers');
this.requests = this.db.list('/requests');
}
getAllOffers() {
return this.offers.map(
(data) => data.map(x => x as Offer)
);
}
deleteOfferByKey($key: string) {
this.offers.remove($key);
}
addOffer(offer: Offer) {
this.offers.push(offer);
}
editOffer(key: string, offer: Offer) {
this.db.object('offers/' + key).update(offer);
}

requestOffer(request: Request) {
    this.requests.push(request);
}
}
