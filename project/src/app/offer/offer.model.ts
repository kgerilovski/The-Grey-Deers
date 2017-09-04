export class Offer {
    public name: string;
    public cost: number;
    public date: Date;
    public $key: string;
    public comments: string;
    public currency: string;
     
    constructor(name: string, cost: number, date: Date, currency: string, comments: string) {
    this.name = name;
    this.cost = cost;
    this.date = date;
    this.currency = currency;
    this.comments = comments;
    }
}

export class Request {
    public $key: string;
    constructor(public email: string, public offerId: string, public status: string) { }
}
  export class RequestOffer {
     constructor(public request: Request, public offer: Offer) { }
}
