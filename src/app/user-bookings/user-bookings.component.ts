import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { RefundService } from '../refund.service';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent implements OnInit {
  userBookings: Post[] = [];
  userId: number | null = null;
  currentDate: Date = new Date();
  booking: any;
  roomNumberFilter: string | null = null;
  checkInDateFilter: Date | null = null;
  checkOutDateFilter: Date | null = null;
  

  constructor(
    private bookingService: PostService, 
    private router: Router,
    private route: ActivatedRoute,
    private user: UserService,
    private refundService:RefundService
  ) {
    this.route.paramMap.subscribe((params) => {
      const userIdParam = params.get('id');
      console.log(userIdParam);

      if (userIdParam !== null) {
        this.userId = parseInt(userIdParam, 10);

        // Fetch user bookings based on the retrieved userId
        this.bookingService.getUserBookings(this.userId).subscribe(
          (bookings) => {
            this.userBookings = bookings;
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }
  get filteredBookings(): Post[] {
    return this.userBookings.filter((booking) => {
      let include = true;
  
      if (this.roomNumberFilter !== null && this.roomNumberFilter !== "") {
        include = include && booking.roomId.toString().includes(this.roomNumberFilter);
      }
  
      if (this.checkInDateFilter !== null) {
        const checkInDate = new Date(booking.checkInDate);
        const formattedCheckInDate = formatDate(checkInDate, 'dd-MM-yyyy', 'en-US'); // Format booking date
        const formattedFilterDate = formatDate(this.checkInDateFilter, 'dd-MM-yyyy', 'en-US'); // Format filter date
  
        include = include && formattedCheckInDate === formattedFilterDate;
      }
  
      if (this.checkOutDateFilter !== null) {
        const checkOutDate = new Date(booking.checkOutDate);
        const formattedCheckOutDate = formatDate(checkOutDate, 'dd-MM-yyyy', 'en-US'); // Format booking date
        const formattedFilterDate = formatDate(this.checkOutDateFilter, 'dd-MM-yyyy', 'en-US'); // Format filter date
  
        include = include && formattedCheckOutDate === formattedFilterDate;
      }
  
      return include;
    });
  }
  
  fetchUserBookings() {
    // Fetch user bookings based on the userId
    if (this.userId !== null) {
      this.bookingService.getUserBookings(this.userId).subscribe(
        (bookings) => {
          this.userBookings = bookings;
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }



  canEdit(booking: Post): boolean {
    // Calculate the difference in days between the current date and check-in date
    const currentDate = new Date();
    const checkInDate = new Date(booking.checkInDate);
    const timeDifference = checkInDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  
    // Allow editing up to 2 days before check-in
    return daysDifference >= 2;
  }
  
  canDelete(booking: Post): boolean {
    // Convert checkoutDate and currentDate to Date objects
    const checkoutDate = new Date(booking.checkOutDate);
    const currentDate = new Date();
  
    // Compare currentDate with checkoutDate
    return currentDate <= checkoutDate;
  }
  deleteBooking(id: number) {
    console.log("Deleting...");
    
    // Fetch the booking details before deleting
    this.bookingService.getBooking(id).subscribe((booking) => {
      // Calculate the refund amount (assuming a refund of the full price)
      const refundAmount = booking.price;

      this.refundService.initiateRefund(id, refundAmount)
        .then((refundResponse) => {
          console.log("Refund initiated successfully:", refundResponse);

          // Now, proceed to delete the booking
          this.bookingService.delete(id).subscribe(
            (deleteResponse) => {
              console.log("Booking deleted successfully!!");
              this.fetchUserBookings();
              console.log(deleteResponse);

              // Show a SweetAlert indicating the successful deletion and refund amount
              Swal.fire({
                icon: 'success',
                title: 'Booking Deleted',
                html: `The booking has been deleted successfully, and a refund of ₹${refundAmount.toFixed(2)} has been initiated.`,
              });
            },
            (deleteError) => {
              console.error("Error deleting booking:", deleteError);

              // Show a SweetAlert indicating the deletion error
              Swal.fire({
                icon: 'error',
                title: 'Error Deleting Booking',
                text: 'There was an error deleting the booking.',
              });
            }
          );
        })
        .catch((refundError) => {
          console.error("Error initiating refund:", refundError);

          // Show a SweetAlert indicating the refund error
          Swal.fire({
            icon: 'error',
            title: 'Error Initiating Refund',
            text: 'There was an error initiating the refund.',
          });
        });
    });
  }
     
    
  

  ngOnInit(): void {
    this.fetchUserBookings();
  }
}
