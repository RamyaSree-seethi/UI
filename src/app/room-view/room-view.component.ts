import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RoomService } from '../room.service';
import { Room } from '../room';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TranslationService } from '../trasnlation.service';
import { Post } from '../post';
@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.css']
})
export class RoomViewComponent implements OnInit {
  roomDetails: any
  rooms: Room[] = []; // Initialize to an empty array
  adults: number = 1;
  children: number = 0;
  checkInDate: string = ''; // Initialize to an empty string
  checkOutDate: string = ''; // Initialize to an empty string
  showFilteredData = false;
  selectedFilter: string = '';
  priceLabel: string = ''; // Initialize to an empty string
  currencySymbol: string = ''; // Initialize to an empty string
  priceLabel$!: Observable<string>;
currencySymbol$!: Observable<string>;


  filteredRooms: Room[] = [];
  minRating: number | null = null;

  constructor(
    private http: HttpClient,
    private roomService: RoomService,
    private router: Router,
    public translationService:TranslationService,
    private cdr: ChangeDetectorRef 
  ) {
    this.minRating = null;
    this.roomDetails=[]
  }

  ngOnInit(): void {
    // Fetch data from your backend and populate roomDetails here
    this.roomService.getRooms().subscribe((data: Room[]) => {
      this.roomDetails = data;
      console.log('Room details:', this.roomDetails);
    });
    this.translationService.getTranslations().subscribe((translations: any) => {
      this.priceLabel = translations.PriceLabel;
      this.currencySymbol = translations.CurrencySymbol;
    });
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
    
    console.log('Booking room with ID:', roomId);
    this.router.navigate(['/booking', roomId]);
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
  Delete(id:number) {
    console.log("Deleting...")
    this.roomService.delete(id).subscribe((res)=>{
      console.log("Deleted Successfully!!");
      console.log(res);
      this.roomService.fetchRooms().subscribe((data)=> {
        this.roomDetails=data;
        console.log(data);
      })
    }, 
    (err)=> 
    {
      console.log(err);
    })
    
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
