import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Room } from './room';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  addRoom(roomData: any) {
    throw new Error('Method not implemented.');
  }

  constructor( private http:HttpClient) { }
  private url='http://localhost:52612/api/RoomDetails'
  private api='http://localhost:52612/api/HotelBookings'
  fetchRooms() {
    return  this.http.get(this.url)
  }
  // getRooms(): Observable<Room[]> {
  //   // Implement the logic to fetch rooms from your API
  //   return this.http.get<Room[]>(this.url);
  // }

  searchRoomsByGuests(adults: number, children: number): Observable<Room[]> {
    // Implement the logic to filter rooms by adults and children
    return this.getRooms().pipe(
      map((rooms: Room[]) =>
        rooms.filter(room =>
          (room.adultsCount as number).valueOf() >= adults && (room.childCount as number).valueOf() >= children
        )
      )
    );
  }
  createRoom(roomData: any): Observable<any> {
    return this.http.post(this.url, roomData);
  }
  getRoomDetails(roomId: number): Observable<any> {
    const url = `http://localhost:52612/api/RoomDetails/${roomId}`;
    console.log('Requesting room details from:', url);
    return this.http.get(url);
  }

  delete(id: any) {
     return this.http.delete(this.url+"/"+id)
  }

  postRooms(body:any){
    return this.http.post(this.url, body)

  }
  putRooms(body:any)
  {
    return this.http.put(this.url, body)
  }

  updateRoom(id: number, room: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, room);
  }
  getRoom(roomId: number): Observable<any> {
    const url = `${this.url}/${roomId}`;
    return this.http.get(url);
  }
  getRooms(): Observable<Room[]> {
    // Replace this with your actual API endpoint to fetch rooms
    return this.http.get<Room[]>(this.url);
  }

  // Add a method to fetch bookings from the backend or mock data
  getBookings(): Observable<Post[]> {
    // Replace this with your actual API endpoint to fetch bookings
    return this.http.get<Post[]>(this.api);
  }
}
  



