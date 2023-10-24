import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RoomService } from '../room.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { Post } from '../post';
import { BookingServiceService } from '../booking-service.service';


interface BookingResponse {
  bookingId: number; // Adjust the type if bookingId is of a different type
  userId:number;
  roomId:number;
  checkInDate:Date;
  checkOutDate:Date;
  adultsCount:number;
  childCound:number;
  price:number;

}


@Component({
  selector: 'app-room-booking',
  templateUrl: './room-booking.component.html',
  styleUrls: ['./room-booking.component.css'],
  
})
export class RoomBookingComponent implements OnInit {
  userId: number | null = null; // Initialize to null
  adultsCount: number | null = null;
  checkInDate: Date | null = null;
  price: number | null = null;
  roomId: number | null = null;
  childCount: number | null = null;
  checkOutDate: Date | null = null;
 
  user!: User;
  form!: FormGroup;
  room: any = {};
  bookingDetails!:Post[] 
  datesInvalid = false;
  roomIdAsNumber: number | null = null;
  minCheckInDate!: Date;
  maxCheckInDate!: Date;
  minCheckOutDate!: Date;
  maxCheckOutDate!: Date;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private roomService: RoomService,
    private userService: UserService,
    private bookingFormService: BookingServiceService,
  
  ) {
    
    // const today = new Date();
    // const oneMonthFromToday = new Date(today);
    // oneMonthFromToday.setMonth(today.getMonth() + 1);

    this.form = this.fb.group({
      userId: [, [Validators.required]],
      adultsCount: [, [Validators.required]],
      checkInDate: [null, [Validators.required]],
      price: [0, [Validators.required]],
      roomId: [, [Validators.required]],
      childCount: [, [Validators.required]],
      checkOutDate: [null, [Validators.required]],
    }, { validator: this.dateValidator.bind(this) });
    
  }

  ngOnInit() {
    // Simulate user login date (you should get this from your authentication service)
    const userLoginDate = new Date(); // Replace this with your actual login date

    // Calculate the min and max check-in and check-out dates based on the user's login date
    this.minCheckInDate = userLoginDate;
    this.maxCheckInDate = new Date(userLoginDate);
    this.maxCheckInDate.setDate(userLoginDate.getDate() + 30); // Allow booking up to 30 days from login

    this.minCheckOutDate = userLoginDate;
    this.maxCheckOutDate = new Date(userLoginDate);
    this.maxCheckOutDate.setDate(userLoginDate.getDate() + 30);

    this.form.get('checkInDate')?.valueChanges.subscribe(() => {
      this.updatePrice();
    });

    this.form.get('checkOutDate')?.valueChanges.subscribe(() => {
      this.updatePrice();
    });

    this.userService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.user = user;
        this.userId = user.userId;
        console.log('UserId:', this.userId);
      } else {
        // Handle the case where no user is logged in (user is null)
      }
    });
  
   
    const savedFormData = localStorage.getItem('formData');

if (savedFormData) {
  // Parse the saved data from JSON
  const parsedFormData = JSON.parse(savedFormData);

  // Populate the component properties and form fields
  this.userId = parsedFormData.userId;
  this.checkInDate = new Date(parsedFormData.checkInDate); // Ensure correct date parsing
  this.checkOutDate = new Date(parsedFormData.checkOutDate); // Ensure correct date parsing
  this.price = parsedFormData.price;

  // Update the form with saved data
  this.form.patchValue(parsedFormData);
  this.updatePrice();
}
  

    this.route.paramMap.subscribe((params) => {
      const roomId = params.get('roomId');
      console.log('roomId (from route params):', roomId);

      // Now you can access the userId

      if (roomId !== null) {
        const roomIdAsNumber = +roomId;
        console.log('roomIdAsNumber (parsed):', roomIdAsNumber);
        this.roomService.getRoomDetails(roomIdAsNumber).subscribe(
          (roomDetails) => {
            this.room = roomDetails;
            console.log('Room Details:', roomDetails);
  
            // Set initial values for form fields based on room details
            this.form.patchValue({
              userId: this.userId, // Set the userId based on your logic
              adultsCount: roomDetails.adultsCount,
              checkInDate: null, // Set to null initially
              price: 0, // Set the price to 0 initially
              roomId: roomIdAsNumber,
              childCount: roomDetails.childCount,
              checkOutDate: null, // Set to null initially
            });
  
            // Update the price initially
            this.updatePrice();
          },
          (error) => {
            console.error('Error fetching room details:', error);
          }
        );
      } else {
        console.error('roomId is null or undefined');
      }
    });
  }
  onCheckInDateChange() {
    this.updatePrice();
  }
  
  onCheckOutDateChange() {
    this.updatePrice();
  }

  updatePrice() {
    const checkInDateStr = this.form.value.checkInDate;
    const checkOutDateStr = this.form.value.checkOutDate;
  
    if (checkInDateStr && checkOutDateStr && this.room && this.room.price) {
      const checkInDate = new Date(checkInDateStr);
      const checkOutDate = new Date(checkOutDateStr);
  
      if (!isNaN(checkInDate.getTime()) && !isNaN(checkOutDate.getTime())) {
        // Calculate the duration in milliseconds
        const durationInMilliseconds = checkOutDate.getTime() - checkInDate.getTime();
  
        // Calculate the duration in days (rounded up)
        const durationInDays = Math.ceil(durationInMilliseconds / (1000 * 60 * 60 * 24));
  
        // Calculate the total price based on room price and duration (minimum of 1 day)
        const totalPrice = Math.max(durationInDays, 1) * this.room.price;
  
        // Update the 'price' form control with the calculated price
        this.form.patchValue({ price: totalPrice });
      } else {
        // Handle invalid date strings
        this.form.patchValue({ price: 0 });
      }
    } else {
      // Handle the case when data is missing
      this.form.patchValue({ price: 0 });
    }
  }
  
  
  
  dateValidator(group: FormGroup) {
    const checkInDate = group.get('checkInDate')?.value;
    const checkOutDate = group.get('checkOutDate')?.value;

    if (checkInDate && checkOutDate && checkOutDate <= checkInDate) {
      this.datesInvalid = true; // Set the variable to true if dates are invalid
      return { invalidDates: true };
    } else {
      this.datesInvalid = false;
    }

    return null;
  }

  submit() {
    console.log('Form Values:', this.form.value);
  
    if (this.form.valid) {
      // Check if the check-in date is greater than or equal to the check-out date
      const checkInDate = new Date(this.form.value.checkInDate);
      const checkOutDate = new Date(this.form.value.checkOutDate);
  
      if (checkInDate >= checkOutDate) {
        // Show an error message and do not proceed with booking
        this.datesInvalid = true;
        return;
      }
  
      // Dates are valid, proceed with booking
      this.http.post('http://localhost:52612/api/HotelBookings/', this.form.value).subscribe(
        (response) => {
          // Cast the response to BookingResponse
          const bookingResponse = response as BookingResponse;
  
          // Access the bookingId property from the typed response
          const bookingId = bookingResponse.bookingId;
  
          // Handle success
          console.log('Booking ID:', bookingId);
  
          // Save the form data to localStorage
        // Save the form data to localStorage
localStorage.setItem('formData', JSON.stringify(this.form.value));

  
          // Navigate to the successful booking page
          this.router.navigate(['/successfulBooking', bookingId], {
            state: {
              roomId: this.form.value.roomId,
          
              adultsCount: this.form.value.adultsCount,
              childCount: this.form.value.childCount,
              checkInDate: this.form.value.checkInDate,
              checkOutDate: this.form.value.checkOutDate,
              price: this.form.value.price,
            },
          });
        },
        (error) => {
          // Handle error
          console.error('Error:', error);
        }
      );
    } else {
      // Form is invalid, set the error flag to show the error message
      this.datesInvalid = true;
    }
  }
}  