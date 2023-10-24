// deleted-refund.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Refund } from './refund';

@Injectable({
  providedIn: 'root',
})
export class DeletedRefundService {
  private deletedRefundsSubject = new BehaviorSubject<Refund[]>([]);
  deletedRefunds$: Observable<Refund[]> = this.deletedRefundsSubject.asObservable();

  constructor() {}

  storeDeletedRefunds(refunds: Refund[]) {
    this.deletedRefundsSubject.next(refunds);
  }

  getDeletedRefunds(): Refund[] {
    return this.deletedRefundsSubject.value;
  }
}
