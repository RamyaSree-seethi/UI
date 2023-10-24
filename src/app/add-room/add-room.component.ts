import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../data.service';
import { Data } from '../data'; // Update the import path as needed
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-add-room', // Update the selector as needed
  templateUrl: './add-room.component.html', // Update the template URL
  styleUrls: ['./add-room.component.css'], // Add your component-specific CSS file
})
export class AddRoomComponent implements OnInit {
  form!: FormGroup;
  data!:Data;
  room!:Data
  newRoom: Data = {
    roomId: 0,
    roomType: '',
    facilities: '', // Initialize facilities as an empty string
    photoUrl: '',
    adultsCount: 0,
    childCount: 0,
    price: 0,
  };
  constructor(
    public dataService: DataService,
    private router: Router,
    private fb: FormBuilder
  ) {
    
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      roomType: ['', Validators.required],
      facilities: this.fb.group({
        FreeWifi: [false],
        SingleRoom: [false],
        PrivateBathroom: [false],
        ComplementaryBreakfast: [false],
        ComplementaryLunch: [false],
        ComplementaryDinner: [false],
        SwimmingPool: [false],
        AC: [false],
      }),
      photoUrl: ['', Validators.required],
      adultsCount: [, Validators.required], // Remove the extra comma
      childCount: [, Validators.required], // Remove the extra comma
      price: [, Validators.required],
    
    });
    
  }

  
  get f(){
    return this.form.controls;
  }
 
  
  
  submit() {
    if (this.form.valid) {
      const selectedFacilities = Object.keys(this.form.value.facilities)
        .filter(key => this.form.value.facilities[key])
        .join(', ');
  
      this.newRoom = {
        roomId: 0,
        roomType: this.form.value.roomType,
        facilities: selectedFacilities,
        photoUrl: this.form.value.photoUrl,
        adultsCount: this.form.value.adultsCount,
        childCount: this.form.value.childCount,
        price: this.form.value.price,
      };
  
      console.log(this.newRoom);
  
      this.dataService.createRoom(this.newRoom).subscribe(
        (res) => {
          console.log("Room is added", res);
          this.router.navigate(['/roomView']);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

}
