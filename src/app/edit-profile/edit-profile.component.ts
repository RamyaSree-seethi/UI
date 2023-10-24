import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userId!: number;
  profileForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = +params['userId']; // Get userId from route parameters

      this.profileForm = this.formBuilder.group({
        userId:['', Validators.required],
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword:['', Validators.required],
        phoneNumber: ['', Validators.required]
        // Add more form controls here
      });

      // Fetch user data based on userId and populate the form
      this.fetchUserData();
    });
  }

  submitForm() {
    
      const formData = this.profileForm.value;
      console.log(formData)
      this.userService.updateUserProfile(this.userId, formData). subscribe((res)=>{
        console.log("User updated successfully!", res);
        this.router.navigate(['viewProfile', this.userId]);
      }, 
      (err)=> {
        console.log(err);
      })
  }
  fetchUserData() {
    this.userService.getUserDetails(this.userId).subscribe((userData) => {
      this.profileForm.patchValue(userData);
    });
  }
}
