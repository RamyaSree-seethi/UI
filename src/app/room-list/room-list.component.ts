import { Component, OnInit } from '@angular/core';
import { Room } from '../room';
import { HttpClient } from '@angular/common/http';
import { RoomService } from '../room.service';
import { Router } from '@angular/router';
import { Post } from '../post';
import { TranslationService } from '../trasnlation.service';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewService } from '../review.service';
import { RatingService } from '../rating.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
})
export class RoomListComponent implements OnInit {
  roomDetails: Room[] = [];
  rooms: Room[] = [];
  adults: number = 1;
  children: number = 0;
  checkInDate: string = '';
  checkOutDate: string = '';
  showFilteredData = false;
  selectedFilter: string = '';
  priceLabel: string = '';
  currencySymbol: string = '';
  priceLabel$!: Observable<string>;
  currencySymbol$!: Observable<string>;

  filteredRooms: Room[] = [];
  minRating: number | null = null;
  ratings!: number[];

  constructor(
    private http: HttpClient,
    private roomService: RoomService,
    private router: Router,
    public translationService: TranslationService,
    private cdr: ChangeDetectorRef,
    private reviewService: ReviewService,
    private ratingService: RatingService
  ) {
    this.minRating = null;
  }

  ngOnInit(): void {
    // Fetch data from your backend and populate roomDetails here
    this.roomService.getRooms().subscribe((data: Room[]) => {
      this.roomDetails = data;
      console.log('Room details:', this.roomDetails);

      // Update room ratings based on feedback
      this.updateRoomRatings();
    });

    this.translationService
      .getTranslations()
      .subscribe((translations: any) => {
        this.priceLabel = translations.PriceLabel;
        this.currencySymbol = translations.CurrencySymbol;
      });
  }

  updateRoomRatings() {
    // Iterate through rooms and update their ratings based on feedback
    this.rooms.forEach((room) => {
      this.reviewService
        .getFeedbackByRoomId(room.roomId)
        .subscribe((feedback) => {
          if (feedback) {
            room.rating = feedback.rating;
            console.log(`Updated rating for room ${room.roomId} to ${feedback.rating}`);
          }
        });
    });

    // After updating ratings, notify the RatingService
    this.ratingService.setRatings(this.rooms.map((room) => room.rating));
  }
   searchRooms() {
    const selectedCheckInDate = new Date(this.checkInDate);
    const selectedCheckOutDate = new Date(this.checkOutDate);
  
    this.roomService.getBookings().subscribe((bookings: Post[]) => {
      // Apply the initial search filter
      let filteredRooms = this.roomDetails.filter((room: Room) => {
        const overlappingBooking = bookings.find((booking) =>
          booking.roomId === room.roomId &&
          (selectedCheckInDate < new Date(booking.checkOutDate) &&
            selectedCheckOutDate > new Date(booking.checkInDate))
        );
        
        // Check if minRating is null or if the room rating is greater than or equal to minRating
        const ratingFilter =
          this.minRating === null || room.rating >= this.minRating;
  
        return (
          !overlappingBooking &&
          room.adultsCount >= this.adults &&
          room.childCount >= this.children &&
          ratingFilter
        );
      });
  
     
      this.rooms = filteredRooms;
      this.cdr.detectChanges();

  
      this.showFilteredData = true;
    });
  }
  bookRoom(roomId: number) {
    // Find the selected room based on the roomId
    const selectedRoom = this.roomDetails.find((room) => room.roomId === roomId);
  
    if (selectedRoom) {
      this.router.navigate(['/booking', roomId], { state: { room: selectedRoom } });
    } else {
      console.error('Selected room not found.');
    }
  }
  

  filterByRating(rating: number) {
    if (this.minRating === rating) {
      // If the same rating is clicked again, remove the filter
      this.minRating = null;
    } else {
      // Set the rating filter
      this.minRating = rating;
    }
  
    // Apply the filters and update this.rooms
    this.searchRooms();
  }
  
  

  filterByPrice(filterOption: string) {
    // Implement logic to filter rooms by price
    if (filterOption === 'lowToHigh') {
      this.rooms.sort((a, b) => a.price - b.price);
    } else if (filterOption === 'highToLow') {
      this.rooms.sort((a, b) => b.price - a.price);
    }
  }

  // Function to handle filtering by guests (adults and children count)
  filterByGuests() {
    // Implement logic to filter rooms based on adults and children count
    this.rooms = this.roomDetails.filter(
      (room: Room) =>
        room.adultsCount >= this.adults && room.childCount >= this.children
    );
  }

  filterByRoomType(roomType: string) {
    // Check if roomDetails is defined and not empty before filtering
    if (!this.roomDetails || this.roomDetails.length === 0) {
      console.error('Room details are empty or undefined.');
      return;
    }

    if (roomType === 'All') {
      this.showFilteredData = false;
    } else {
      this.rooms = this.roomDetails.filter(
        (room: Room) => room.roomType.toLowerCase() === roomType.toLowerCase()
      );
      this.showFilteredData = true;
    }
  }
}
