import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router'; // Import the Router

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  constructor(private router: Router) {} // Inject the Router

  ngOnInit() {
    this.showSuccessAlert();
  }

  showSuccessAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Booking and Payment Successful',
      text: 'Your booking and payment have been processed successfully.',
    }).then((result) => {
      if (result.isConfirmed) {
        // Navigate to the index page or any other route
        this.router.navigate(['/index']); // Replace '/' with your desired route
      }
    });
  }
}
