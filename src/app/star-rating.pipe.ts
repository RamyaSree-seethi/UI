import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starRating'
})
export class StarRatingPipe implements PipeTransform {
  transform(rating: number): string {
    const filledStars = '★'.repeat(Math.floor(rating));
    const halfStar = rating % 1 === 0.5 ? '½' : '';
    const emptyStars = '☆'.repeat(Math.floor(5 - rating));
    return filledStars + halfStar + emptyStars;
  }
}
