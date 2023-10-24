import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { RefundService } from '../refund.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css'],
  providers:[DatePipe]
})
export class EditBookingComponent implements OnInit {
  bookingId!: number ;
  booking: any = {}; // Initialize an empty booking object
  roomPricePerDay: number = 0; // Initialize with the default room price per day
  totalPrice: number = 0; // Initialize with 0
  additionalAmount!:number
 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private refundService:RefundService,
    private datePipe:DatePipe
    
  ) {}

  ngOnInit() {
    // Get the booking ID from the route parameter
    this.route.paramMap.subscribe((params) => {
      const bookingIdParam = params.get('id');
      if (bookingIdParam !== null) {
        this.bookingId = parseInt(bookingIdParam, 10);

        // Fetch the booking and room price based on the retrieved bookingId
        this.fetchBooking();
      }
    });
  }

  // Inside the fetchBooking method
  fetchBooking() {
    // Ensure that bookingId is not null before making the request
    if (this.bookingId !== null) {
      this.postService.getBooking(this.bookingId).subscribe(
        (booking) => {
          this.booking = booking;
  
          // Fetch the room's price per day based on the roomId
          this.postService.getRoomPrice(this.booking.roomId).subscribe(
            (roomPrice) => {
              this.roomPricePerDay = roomPrice;
              console.log('roomPricePerDay:', this.roomPricePerDay); // Check the room price
              const checkInDate = new Date(this.booking.checkInDate) as Date;
              const checkOutDate = new Date(this.booking.checkOutDate) as Date;
              this.calculateTotalPrice(checkInDate, checkOutDate);
            },
            (err) => {
              console.error(err);
            }
          );
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }
  


  onCheckInDateChange() {
    const checkInDate = new Date(this.booking.checkInDate) as Date;
    const checkOutDate = new Date(this.booking.checkOutDate) as Date;
    this.calculateTotalPrice(checkInDate, checkOutDate);
  }
  
  onCheckOutDateChange() {
    const checkInDate = new Date(this.booking.checkInDate) as Date;
    const checkOutDate = new Date(this.booking.checkOutDate) as Date;
    this.calculateTotalPrice(checkInDate, checkOutDate);
  }
  calculateTotalPrice(checkInDate: Date, checkOutDate: Date) {
    const durationInDays = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    this.totalPrice = this.roomPricePerDay * durationInDays;

    // Update the booking's price
    this.booking.price = this.totalPrice;
  }
  onSubmit() {
    // Ensure that bookingId is not null before making the request
    if (this.bookingId !== null) {
      // Fetch the previous price from the server before updating the booking
      this.postService.getBooking(this.bookingId).subscribe(
        (previousBooking) => {
          const previousPrice = previousBooking.price; // Store the initial booking price
  
          // Set the requestDate to the current date
          this.booking.requestDate = new Date().toISOString();
  
          this.postService.update(this.bookingId, this.booking).subscribe(
            (data: any) => {
              console.log(data);
              console.log('Booking updated successfully');
              console.log('Previous Price:', previousPrice);
              console.log('Current Total Price:', this.totalPrice);
  
              if (this.totalPrice < previousPrice) {
                // Calculate the refund amount
                const refundAmount = previousPrice - this.totalPrice;
  
                // Initiate the refund
                this.refundService.initiateRefund(this.bookingId, refundAmount)
                  .then((response) => {
                    console.log('Refund initiated:', response);
  
                    // Show a SweetAlert indicating the refund initiation
                    Swal.fire({
                      icon: 'success',
                      title: 'Refund Initiated',
                      text: `A refund of ${refundAmount} has been initiated.`,
                    });
  
                    // Handle the refund process as needed
                    console.log('Price decreased. Navigating back to user bookings...');
                    this.router.navigate(['/userbookings', this.booking.userId]);
                  })
                  .catch((error) => {
                    console.error('Refund failed:', error);
                    // Handle refund failure, e.g., show an error message to the user
                  });
              } else if (this.totalPrice > previousPrice) {
                const additionalAmount = this.totalPrice - previousPrice;
                console.log(additionalAmount);
  
                // Price increased, navigate to the successfulBooking page
                console.log('Price increased. Navigating to successfulBooking page...');
                this.router.navigate(['/modifiedBooking', this.bookingId], {
                  queryParams: { additionalAmount: additionalAmount },
                });
              } else {
                // Price remained the same, navigate back to user bookings
                console.log('Price remained the same. Navigating back to user bookings...');
                this.router.navigate(['/userbookings', this.booking.userId]);
              }
            });
        },
        (error) => {
          console.error('Error fetching previous booking:', error);
          // Handle the error, e.g., show an error message to the user
        }
      );
    }
  }
  
  
  }
  
  