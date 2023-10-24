import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
     
import {  BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
  
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user!:User;
  private currentUserSubject: BehaviorSubject<User | null>;

  


  private apiURL = "http://localhost:52612/api";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  id: any;

  constructor(private httpClient: HttpClient) { this.currentUserSubject = new BehaviorSubject<User | null>(null);}
    
  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/RegisterUsers/')
    .pipe(
      catchError(this.errorHandler)
    )
  }
  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
  }
  deleteUser(userId: number): Observable<void> {
    const url = `${this.apiURL}/RegisterUsers/${userId}`;
    return this.httpClient.delete<void>(url);
  }

  // A method to get the current user
  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }
    

  create(user:User): Observable<any> {
  
    return this.httpClient.post(this.apiURL + '/RegisterUsers/', JSON.stringify(user), this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }  
    

  find(userId:number): Observable<any> {
   
  
    return this.httpClient.get(this.apiURL + '/RegisterUsers/' + userId)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
   

  update(id: number, user: User): Observable<any> {
    return this.httpClient.put(`${this.apiURL}/RegisterUsers/${id}`, user, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  
  
  getUserId(): Observable<number | null> {
    return this.id.asObservable();
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiURL+'/RegisterUsers/');
  }
  

  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/RegisterUsers/' + id, this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
  checkDuplicateUser(email: string): Observable<any> {
    const url = `${this.apiURL}/RegisterUsers/checkDuplicateUser?email=${email}`;
    return this.httpClient.get(url);
  }

  getUserDetails(userId: number): Observable<any> {
    const url = `${this.apiURL}/RegisterUsers/${userId}`;
    return this.httpClient.get(url);
  }

 getUserProfile(userId: number): Observable<User> {
  const url = `${this.apiURL}/RegisterUsers/${userId}`; // Replace with your API endpoint

  // Make an HTTP GET request to fetch the user's profile
  return this.httpClient.get<User>(url);
}
updateUserProfile(userId:number, updatedUser: User): Observable<User> {
  const url = `${this.apiURL}/RegisterUsers/${userId}`;
  // Log request details for debugging
  console.log('PUT Request URL:', url);
  console.log('Request Headers:', this.httpOptions.headers);
  console.log('Request Body:', updatedUser);

  // Make the HTTP PUT request
  return this.httpClient.put<User>(url, updatedUser, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
}
errorHandler(error: any) {
  console.error('Service Error:', error);
  return throwError(error); // Re-throw the error for the component to handle
}
 
}