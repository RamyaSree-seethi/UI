import { Component, OnInit } from '@angular/core';
import { RoomService } from '../room.service';
import { Room } from '../room';
import { Router } from '@angular/router';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  roomDetails: any; 
  rooms:Room[]=[]
  adults:number=1
  children:number=0;
  showFilteredData=false;
  constructor(private roomService:RoomService,
              private router:Router) {}
  ngOnInit(): void {
    this.roomService.fetchRooms() .subscribe((data)=>{
      this.roomDetails=data;
      console.log(data);
    }, 
    (err)=> {
      console.log(err);
    })
    
  }
  bookRoom() {
    this.router.navigate(['/roomBooking']);
  }
  searchRooms() {
    this.roomService
      .searchRoomsByGuests(this.adults, this.children)
      .subscribe((filteredRooms: Room[]) => {
        this.rooms = filteredRooms;
        console.log(this.rooms)
        this.showFilteredData = true
      });
  }
 
  Delete(id:number) {
    console.log("Deleting...")
    this.roomService.delete(id).subscribe((res)=>{
      console.log("Deleted Successfully!!");
      console.log(res);
      this.roomService.fetchRooms().subscribe((data)=> {
        this.roomDetails=data;
        console.log(data);
      })
    }, 
    (err)=> 
    {
      console.log(err);
    })
    
  }
  
}
  


