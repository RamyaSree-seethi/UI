import { Component, OnInit } from '@angular/core';
import { Review } from '../review/review.model';
import { Observable } from 'rxjs';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  reviews: Review[] = [];
  review!: Observable<Review[]>;
  selectedRating: string = '';
  ratings: number[] = [];
  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviewService.getRatings().subscribe((ratings) => {
      // Update the ratings in this component when changes occur
      this.ratings = ratings;
    });
    this.review = this.reviewService.getAll();
    this.review.subscribe((res) => {
      this.reviews = res;
    });
  }
  filterReviews() {
    if (this.selectedRating === '') {
      // If no rating is selected, show all reviews
      this.review.subscribe((res) => {
        this.reviews = res;
      });
    } else {
      // Filter reviews by selected rating
      this.review.subscribe((res) => {
        this.reviews = res.filter((review) => review.rating.toString() === this.selectedRating);
      });
    }
  }

}
