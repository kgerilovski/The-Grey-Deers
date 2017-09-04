import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Offer, Request, RequestOffer } from './offer.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/combineLatest';
 
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

getOffersByStatus(status: string) {
    const queryList$ = this.db.list('/requests', {
        query: {
            orderByChild: 'status',
            equalTo: status
        }
    });
    return queryList$.map(
        requestList => requestList.map(request => this.db.object('offers/' + request.offerId)
            .map((offer) => {
                return new RequestOffer(request as Request, offer as Offer)
            }
            )))
        .flatMap(fobjs => Observable.combineLatest(fobjs));
}
approveOffer(req: RequestOffer) {
    this.db.object('requests/' + req.request.$key + '/status').set('approved').then
    this.db.object('offers/' + req.offer.$key + '/totalOffers');
    alert('Offer Approved!');
}
declineOffer($key: string) {
    this.requests.remove($key);
    alert('Offer Declined!');
}
}
