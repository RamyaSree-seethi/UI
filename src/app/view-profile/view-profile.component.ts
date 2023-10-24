// view-profile.component.ts

import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

import { User } from '../user';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css'],
})
export class ViewProfileComponent implements OnInit {
  editing = false;
  userId!: number;
  id!:number;
  form!: FormGroup;

  submitted = false;

  user: User = {
    userId: 0,
    userName: '',
    email: '',
    password: '',
    phoneNumber: '',
    confirmPassword: ''
  };

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.user = {
      userId: 0,
      userName: '',
      email: '',
      password: '',
      phoneNumber: '',
      confirmPassword: ''
    };
    // Get the userId from the route parameters
    this.route.paramMap.subscribe((params) => {
      const userIdParam = params.get('id');
      console.log(userIdParam);
      
      if (userIdParam !== null) {
        this.userId = parseInt(userIdParam, 10);
       
        this.userService.getUserDetails(this.userId).subscribe((user) => {
          this.user = user;
        });
      }
    });
  }
  goToUserBookings() {
    if (this.userId !== null) {
      this.router.navigate(['/userbookings', this.userId]);
    }
}
}