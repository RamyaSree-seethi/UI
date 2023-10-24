import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {User} from '../user';
import { NavigationService } from '../navigation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  userId!: number;
  users: User[] = [];

  constructor(public userService: UserService,
    private navigationService:NavigationService,
   
    private router: Router) { }
    ngOnInit(): void {

  this.userService.getAll().subscribe((data: User[])=>{
    this.users = data;
    console.log(this.users);
  
  })
    }
    navigateToNewRoute() {
     
      this.navigationService.pushToStack('/new-route');
    }
    
    goBack() {
      const previousRoute = this.navigationService.popFromStack();
    
      if (previousRoute) {
        // Navigate to the previous route
        this.router.navigateByUrl(previousRoute);
      } else {
        // Handle case where the stack is empty (e.g., go to the home page)
        this.router.navigate(['/login']);
      }
    }
    }
  
  

  

