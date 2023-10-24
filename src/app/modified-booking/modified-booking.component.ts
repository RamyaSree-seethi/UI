
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BookingServiceService } from '../booking-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import emailjs, { send } from '@emailjs/browser';
import { ReactiveFormsModule } from '@angular/forms';

import * as html2pdf from 'html2pdf.js';
import { EmailService } from '../email-service.service';
import { state } from '@angular/animations';


@Component({
  selector: 'app-modified-booking',
  templateUrl: './modified-booking.component.html',
  styleUrls: ['./modified-booking.component.css']
})
export class ModifiedBookingComponent implements OnInit{
  bookingId!: number;
  additionalAmount: number=0;
  bookingDetails: any = {}; 
  paymentDetails: any = {}; 
  paymentForm!: FormGroup;
  form!:FormGroup
  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingServiceService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router ,
    private datePipe: DatePipe,
    private emailService: EmailService,
  ) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      expiryDate: ['', [Validators.required]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      upiId:['', [Validators.required]]
    });
  }
  generatePDF(bookingDetailsHTML: string) {
    const content = document.getElementById('pdf-content'); // Replace 'pdf-content' with the HTML element ID that contains your booking details.
    const pdfOptions = {
      margin: 10,
      filename: 'booking-details.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf()
      .from(content)
      .set(pdfOptions)
      .outputPdf()
      .then((pdfBlob: Blob) => {
        this.emailService.sendEmailWithAttachment(bookingDetailsHTML, pdfBlob)
        .subscribe((res)=>{
          console.log('Email sent successfully:',res)
        }, 
        (err)=> {
          console.log(err);
        }
        );
        
      });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      const additionalAmount = queryParams['additionalAmount'];
      if (additionalAmount) {
        this.additionalAmount = parseFloat(additionalAmount);
        console.log("Additional Amount is:", this.additionalAmount);
      } else {
        console.log("No additional amount found in query parameters.");
      }
    });
    
    this.route.paramMap.subscribe((params) => {
      const bookingId = params.get('bookingId');
      if (bookingId) {
        this.bookingId = +bookingId;
        // Fetch booking details using your service
        this.bookingService.getBookingDetails(this.bookingId).subscribe(
          (data) => {
            this.bookingDetails = data;
            console.log(data);
          },
          (error) => {
            console.error('Error fetching booking details:', error);
          }
        );
      }
    });
  }
   submitPayment() {
    if (this.paymentForm?.valid) {
      // If the form is valid, format the expiryDate
      const rawExpiryDate = this.paymentForm.get('expiryDate')?.value;
      const formattedExpiryDate = this.formatDate(rawExpiryDate);
  
      // Create the paymentData object with the formatted expiryDate
      const paymentData = {
        cardNumber: this.paymentForm.get('cardNumber')?.value,
        expiryDate: formattedExpiryDate,
        cvv: this.paymentForm.get('cvv')?.value,
        ybl:this.paymentForm.get('upiId')?.value
      };
  
      // Send a POST request to your backend to process the payment.
      this.http.post('http://localhost:52612/api/BankCards', paymentData).subscribe(
        (response) => {
          // Payment successful, you can handle the response here.
          console.log('Payment successful:', response);
          this.router.navigate(['/payment-success']);
        },
        (error) => {
          // Payment failed, handle the error.
          console.error('Payment error:', error);
  
          // Display an error message to the user or redirect to a failure page.
          this.router.navigate(['/payment-failure']);
        }
      );
    } else {
      // Form is invalid, mark fields as touched to display validation errors.
      this.markFormFieldsAsTouched();
    }
  }

  formatDate(rawDate: string): string {
    const date = new Date(rawDate);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
    const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
    return `${month}/${day}`;
  }
  markFormFieldsAsTouched() {
    Object.keys(this.paymentForm.controls).forEach((field) => {
      const control = this.paymentForm.get(field);
      if (control) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }}


