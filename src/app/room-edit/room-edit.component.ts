import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../room.service';


@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {
  room: any = {}; // Initialize an empty room object

  constructor(private route: ActivatedRoute, private router: Router, private roomService: RoomService) { }
ngOnInit() {
  // Get the room ID from the route parameters
  this.route.paramMap.subscribe(params => {
    const roomId = params.get('id');
    console.log('roomId (from route params):', roomId);

    // Check if roomId is not null before proceeding
    if (roomId !== null) {
      // Convert roomId to a number
      const roomIdAsNumber = +roomId;
      console.log('roomIdAsNumber (parsed):', roomIdAsNumber);

      // Fetch the room details based on the ID
      this.roomService.getRoom(roomIdAsNumber).subscribe((data: any) => {
        this.room = data;
        console.log(data);
        // Populate the room object with fetched data
      });
    }
  });
}
  onSubmit() {
    // Send a PUT or PATCH request to update the room details
    this.roomService.updateRoom(this.room.roomId, this.room).subscribe((data: any) => {
      
      console.log(data);
      console.log('Room updated successfully');
      this.router.navigate(['/roomView']); // Redirect to the rooms list
    });
  }
}
