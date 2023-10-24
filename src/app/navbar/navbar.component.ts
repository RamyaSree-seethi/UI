import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  IsLoggedIn: boolean = false;
  IsAdmin: boolean = false;
  IsCustomer:boolean=false
  users: User[] = [];
  id!:number;
  constructor(public userService:UserService) {}

  ngOnInit(): void {
    this.IsLoggedIn = localStorage.getItem('User') !== null;
    const userData = localStorage.getItem('User');
    console.log(userData);
    
    if (userData) {
      const user = JSON.parse(userData);
      this.IsAdmin = user.email === 'admin@gmail.com';
      this.IsLoggedIn=true
      this.IsCustomer = user.userName === 'Customer';
    
      this.id = user.userId; 
  
      // Fetch additional user details using the user ID
      this.userService.getUserDetails(this.id).subscribe(
        (userDetails) => {
          // Handle the additional user details here
          console.log('User Details:', userDetails);
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    }
  
    this.userService.getAll().subscribe((data: User[]) => {
      this.users = data;
      console.log(this.users);
    
    });
  }
  
  //  this.load();

  Logout() {
    localStorage.removeItem('User');
    location.href = '/index';
  }
}

