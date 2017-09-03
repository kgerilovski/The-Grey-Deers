import { NgForm } from '@angular/forms';
import { OfferService } from './../offer.service';
import { Offer } from './../offer.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  offerList: Offer[] = [];
  selectedOffer: Offer;
  @ViewChild('addOfferModal') public addOfferModal: ModalDirective ;
  @ViewChild('editOfferModal') public editOfferModal: ModalDirective ;

  constructor(private offerService: OfferService) {
    offerService.getAllOffers().subscribe(
      data => this.offerList = data
    );
  }

  onAddOffer(form: NgForm) {
    const name = form.value.offerName;
    const cost = form.value.cost;
    const date = form.value.date;
    const comments = form.value.comments;
    const currency = form.value.currency;
    const offer: Offer = new Offer(name, cost, date, currency, comments);
    this.offerService.addOffer(offer);
    form.reset();
  }

  onSaveOffer(form: NgForm) {
    console.log(form);
    const name = form.value.offerName;
    const cost = form.value.cost;
    const date = form.value.date;
    const comments = form.value.comments;
    const currency = form.value.currency;

    const editedOffer = new Offer(name, cost, date, currency, comments);
    editedOffer.name = editedOffer.name.length === 0 ? this.selectedOffer.name : editedOffer.name;
    editedOffer.cost = editedOffer.cost.toString.length === 0 ? this.selectedOffer.cost : editedOffer.cost;
    editedOffer.date = !editedOffer.date ? this.selectedOffer.date : editedOffer.date;
    editedOffer.comments = editedOffer.comments.length === 0 ? this.selectedOffer.comments : editedOffer.comments;
    editedOffer.currency = editedOffer.currency.length === 0 ? this.selectedOffer.currency : editedOffer.currency;

    this.offerService.editOffer(this.selectedOffer.$key, editedOffer);
    this.editOfferModal.hide();
  }

  onDeleteByOfferKey(key: string) {
    this.offerService.deleteOfferByKey(key);
  }

  onSelectByOfferKey(key: string) {
    this.selectedOffer = this.offerList.filter(x => x.$key === key)[0];
    this.editOfferModal.show();
  }

  ngOnInit() {
  }

}
