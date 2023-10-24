import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
  providers: [DatePipe]
})
export class BookingsComponent implements OnInit{
  regUsers!: Observable<Post[]>;
post:Post[]=[]
id!:number
minPrice: number | null = null;
maxPrice: number | null = null;
searchUserId: number | undefined;
  searchRoomId: number | undefined;
  searchCheckInDate: string | undefined;
  searchCheckOutDate: string | undefined;
  searchPrice: number | undefined;
constructor(private postService:PostService, private datePipe: DatePipe){}
  ngOnInit(): void {
    this.regUsers = this.postService.getAll();
    this.regUsers.subscribe((res) => {
      this.post= res;
      console.log(res);

    }, 
    (err)=> {
      console.log(err);
    });
  }
  Delete(id:number) {
    console.log("Deleting...")
    this.postService.delete(id).subscribe((res)=>{
      console.log("Deleted Successfully!!");
      console.log(res);
      this.postService.getAll().subscribe((data)=> {
        this.regUsers=data;
        console.log(data);
      })
    }, 
    (err)=> 
    {
      console.log(err);
    })
  }
  search() {
    if (this.searchUserId !== undefined) {
      this.post = this.post.filter((booking) => booking.userId === this.searchUserId);
    }
    if (this.searchRoomId !== undefined) {
      this.post = this.post.filter((booking) => booking.roomId === this.searchRoomId);
    }

    if (this.searchCheckInDate !== undefined) {
      const searchCheckInDate = new Date(this.searchCheckInDate);
      this.post = this.post.filter((booking) => this.datePipe.transform(booking.checkInDate, 'yyyy-MM-dd') === this.datePipe.transform(searchCheckInDate, 'yyyy-MM-dd'));
    }
  
    // Filter by check-out date
    if (this.searchCheckOutDate !== undefined) {
      const searchCheckOutDate = new Date(this.searchCheckOutDate);
      this.post = this.post.filter((booking) => this.datePipe.transform(booking.checkOutDate, 'yyyy-MM-dd') === this.datePipe.transform(searchCheckOutDate, 'yyyy-MM-dd'));
    }
    if (this.minPrice == null || this.maxPrice == null) {
      // Handle invalid input or missing values
      return;
    }
  
    // Use the Array's filter method to filter the bookings
    this.post = this.post.filter((booking) => {
      const bookingPrice = booking.price;
      return bookingPrice >= this.minPrice! && bookingPrice <= this.maxPrice!;
    });

  }
  searchByPrice() {
    if (this.minPrice == null || this.maxPrice == null) {
      // Handle invalid input or missing values
      return;
    }
  
    // Use the Array's filter method to filter the bookings
    this.post = this.post.filter((booking) => {
      const bookingPrice = booking.price;
      return bookingPrice >= this.minPrice! && bookingPrice <= this.maxPrice!;
    });
    
  }
  }









  

