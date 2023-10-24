import { Component } from '@angular/core';
import { Review } from './review.model';
import { ReviewService } from '../review.service';
import { RatingService } from '../rating.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  rating: number = 0;
  review: Review = {
    userName: '',
    roomId: 0,
    rating: 0,
    comment: ''
  };
  rooms: any;

  constructor(private reviewService: ReviewService, private ratingService: RatingService) {}

  submitReview() {
    // Call the feedback service to submit the review to the backend
    this.reviewService.submitFeedback(this.review).subscribe(
      (response) => {
        // Handle the response (e.g., show a success message)
        console.log('Review submitted successfully:', response);
        window.location.href = '/index';
        // Call a method to update room ratings after submitting feedback
        this.updateRoomRatings();
      },
      (error) => {
        // Handle errors (e.g., display an error message)
        console.error('Error submitting review:', error);
        alert('Please fill all the fields');
      }
    );
    this.updateRoomRatings();
  }
  onClick(rating: number): void {
    this.rating = rating;
    this.review.rating = rating;
  }
  updateRoomRatings() {
    this.reviewService.getFeedbacks().subscribe((feedbacks: Review[]) => {
      const ratings = feedbacks.map((feedback) => feedback.rating);
      this.ratingService.setRatings(ratings);
    });
  }
}
