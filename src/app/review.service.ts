import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from './review/review.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:52612/api/feedbacks'; // Replace with your backend API URL
  private reviews: any[] = [];
  private ratingsSubject = new BehaviorSubject<number[]>([]);
  constructor(private http: HttpClient) {}

  submitReview(review: Review): Observable<any> {
    return this.http.post(`${this.apiUrl}`, review);
  }
  getAll(): Observable<Review[]> {
    // Replace this with your actual API endpoint to fetch rooms
    return this.http.get<Review[]>(this.apiUrl);
  }
  getFeedbacks(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl);
  }
  getFeedbackByRoomId(roomId: number): Observable<Review> {
    return this.http.get<Review>(`${this.apiUrl}/${roomId}`);
  }

  // Add a method to submit feedback
  submitFeedback(feedback: Review): Observable<any> {
    return this.http.post(this.apiUrl, feedback);
  }
  
  // Add a new review
  addReview(review: any) {
    this.reviews.push(review);
    this.updateRatings();
  }

  // Calculate and update ratings
  private updateRatings() {
    const ratings: number[] = [];
    // Calculate ratings based on reviews and update the 'ratings' array
    // This part depends on your logic for calculating ratings from reviews
    // For example, you might iterate through reviews and calculate the average rating for each room.
    // You can then update 'ratings' accordingly.
    this.ratingsSubject.next(ratings);
  }

  // Get ratings as an observable
  getRatings() {
    return this.ratingsSubject.asObservable();

}
}


  
