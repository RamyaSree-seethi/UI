import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from './post';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiURL = "http://localhost:52612/api";
  private userData: any = null;
  

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
   
  constructor(private httpClient: HttpClient, private user:UserService) { 
    this.loadUserData();
  }
  private loggedInUser: { id: number; name: string } | null = null;

 
  public loadUserData() {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      this.userData = JSON.parse(userDataStr);
      console.log('Loaded user data:', this.userData);
    }
  }
  getBooking(bookingId: number): Observable<Post> {
    const url = `${this.apiURL}/HotelBookings/${bookingId}`;
    return this.httpClient.get<Post>(url);
  }



updateBooking(booking: Post): Observable<any> {
  const url = `${this.apiURL}/HotelBookings/${booking.bookingId}`;
  return this.httpClient.put(url, booking, this.httpOptions);
}

  

  // Example method to retrieve the user's ID
  getUserId(): number | null {
    if (this.userData && this.userData.userId) {
      return this.userData.userId;
      console.log("UserId", this.userData)
    } else {
      return null;
    }
  }
  getRoomPrice(roomId: number): Observable<number> {
    // Make an HTTP GET request to fetch the room's price based on the roomId
    return this.httpClient.get<number>(`${this.apiURL}/RoomDetails/${roomId}/price`);
  }

  // Example method to log the user in
  login(username: string, password: string): void {
    // Simulate a successful login and store user data
    const userId = 1003; // Replace with your actual user ID
    this.userData = { userId:userId, username: username };
  
    // Save user data to local storage
    localStorage.setItem('userData', JSON.stringify(this.userData));
  }
  

  // Example method to log the user out
  logout(): void {
    // Clear user data and remove from local storage
    this.userData = null;
    localStorage.removeItem('userData');
  }

  

  
  getAll(): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/HotelBookings')
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
 
  create(bookingData:any): Observable<any> {
    return this.httpClient.post(this.apiURL + '/HotelBookings/', JSON.stringify(bookingData), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  } 
  
  find(id:number): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/HotelBookings/' + id)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getUserBookings(userId: number): Observable<Post[]> {
    const url = `${this.apiURL}/HotelBookings/user/${userId}`;
  
    return this.httpClient.get<Post[]>(url);
  
  }
  
  update(id:number, post:Post): Observable<any> {
  
    return this.httpClient.put(this.apiURL + '/HotelBookings/' + id, JSON.stringify(post), this.httpOptions)
  
    .pipe( 
      catchError(this.errorHandler)
    )
  }
       
  /**
   * Write code on Method
   *
   * @return response()
   */
  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/HotelBookings/' + id, this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }

  
      
  /** 
   * Write code on Method
   *
   * @return response()
   */
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  }
  