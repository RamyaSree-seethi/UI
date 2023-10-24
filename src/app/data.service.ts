import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = "http://localhost:52612/api";// Replace with your actual API URL

  constructor(private http: HttpClient) { }

  // Create a new room
  createRoom(room: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/RoomDetails`, room);
  }

  // Get all rooms
  getAllRooms(): Observable<any> {
    return this.http.get(`${this.baseUrl}/RoomDetails`);
  }

  // Get a room by ID
  getRoomById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/RoomDetails/${id}`);
  }

  // Update a room
  updateRoom(id: number, room: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/RoomDetails/${id}`, room);
  }

  // Delete a room
  deleteRoom(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/RoomDetails/${id}`);
  }
}

