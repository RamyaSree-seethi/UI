// In a booking service or a dedicated service file (e.g., booking.service.ts)
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingServiceService {
  private formData: any = {};
  private baseUrl = 'http://localhost:52612/api'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getBookingDetails(bookingId: number): Observable<any> {
    const url = `${this.baseUrl}/HotelBookings/${bookingId}`; // Adjust the URL according to your API endpoint
    return this.http.get(url);
    
  }
  setFormData(data: any) {
    this.formData = { ...data };
  }

  getFormData() {
    return { ...this.formData };
  }

  clearFormData() {
    this.formData = {};
  }
}
