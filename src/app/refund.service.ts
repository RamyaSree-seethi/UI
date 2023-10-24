import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient to make HTTP requests
import { Observable } from 'rxjs';
import { Refund } from './refund';

@Injectable({
  providedIn: 'root',
})
export class RefundService {

  private apiUrl = 'http://localhost:52612/api/Refunds'; 
  constructor(private http: HttpClient) {}
  // delete(refundId: number): Observable<void> {
  //   const url = `${this.apiUrl}/${refundId}`;
  //   return this.http.delete<void>(url);
  // }
  updateIsProcessed(refundId: number, isProcessed: boolean): Observable<any> {
    const body = { isProcessed: isProcessed };
    return this.http.put(`http://localhost:52612/api/Refunds/${refundId}/updateIsProcessed`, body);
  }
  updateRefund(refundId:number, refund: Refund): Observable<any> {
    const url = `${this.apiUrl}/${refund.refundId}`;
    return this.http.put(url, refund);
  }
  getAll(): Observable<Refund[]> {
    
    return this.http.get<Refund[]>(this.apiUrl);
  }
  getRefundById(refundId: number): Observable<Refund> {
    const url = `${this.apiUrl}/${refundId}`;
    return this.http.get<Refund>(url);
  }
  delete(refundId: number): Observable<Refund> {
    // Perform the delete request
    return this.http.delete<Refund>(`${this.apiUrl}/refund/${refundId}`);
  }

  initiateRefund(bookingId: number, amount: number): Promise<any> {
    const refundData = { bookingId, amount }; 
    return this.http.post('http://localhost:52612/api/Refunds', refundData).toPromise();
  }
}
