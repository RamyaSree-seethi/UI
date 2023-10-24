// rating.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private ratingsSubject = new BehaviorSubject<number[]>([]);
  ratings$ = this.ratingsSubject.asObservable();

  constructor() {}

  setRatings(ratings: number[]) {
    this.ratingsSubject.next(ratings);
  }
}
