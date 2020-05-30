import { Injectable } from "@angular/core";
import { CouchbaseService } from "../services/couchbase.service";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ReservationService {

    reservations: Array<number>;
    docId: string = "reservations";

    constructor(
        private couchbaseService: CouchbaseService
        ) {
        this.reservations = [];
        let doc = this.couchbaseService.getDocument(this.docId);
        if( doc == null) {
          this.couchbaseService.createDocument({"reservations": []}, this.docId);
          console.log('first reservation');
          doc = this.couchbaseService.getDocument(this.docId);
        }
        else {
            console.log(JSON.stringify(doc))
            this.reservations = doc.reservations;
        }
    }

    addReservation(data: number): boolean {
        this.reservations.push(data);
        this.couchbaseService.updateDocument(this.docId, {"reservations": this.reservations});
        console.log(JSON.stringify(this.couchbaseService.getDocument('reservations')))
        return true;
    }
}