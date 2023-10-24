import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface EmailRequest {
  to: string;
  subject: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private emailApiUrl = 'http://localhost:52612/api/Email/send';
  constructor(private http: HttpClient) {}

  sendConfirmationEmail(email: string): Observable<any> {
    const apiUrl = 'http://localhost:52612/api/Email/send'; // Replace with your backend API endpoint
    const emailData = { email };

    return this.http.post(apiUrl, emailData);
  }
 

  sendEmailWithAttachment(bookingDetailsHTML: string, pdfBlob: Blob) {
    const formData = new FormData();
    formData.append('bookingDetailsHTML', bookingDetailsHTML);
    formData.append('pdfBlob', pdfBlob, 'booking-details.pdf');

   
    return this.http.post('/api/HotelBookings/send-email', formData);
  }
  sendEmail(emailRequest: EmailRequest): Observable<any> {
    return this.http.post(this.emailApiUrl, emailRequest);
  }
}
