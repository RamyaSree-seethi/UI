import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../user';
import { EmailService } from '../email-service.service';
import { NavigationService } from '../navigation.service';

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class signupComponent implements OnInit {
  form!: FormGroup;
  showAlert = false;
  duplicateUserError = false; // Add this variable to handle duplicate user error
  
  constructor(
    public userService: UserService,
    public fb: FormBuilder,
    private navigationService: NavigationService,
    private emailService: EmailService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    });
    this.form.valueChanges.subscribe(() => {
      this.showAlert = false;
      this.duplicateUserError = false; // Reset the duplicate user error flag
    });
  }

  get f() {
    return this.form.controls;
  }
  submit() {
    Object.keys(this.form.controls).forEach((controlName) => {
      this.form.get(controlName)?.markAsTouched();
    });
  
    if (this.form.valid) {
      if (this.form.value.password != this.form.value.confirmPassword) {
        alert("Password and Confirm Password must be the same!");
      } else {
        this.userService.checkDuplicateUser(this.form.value.email).subscribe(
          (duplicateResponse: any) => {
            if (duplicateResponse.isDuplicate) {
              
              this.duplicateUserError = true;
             
            } else {
              
              this.userService.create(this.form.value).subscribe(
                (res) => {
                  console.log("Account Signed successfully!");
                  this.router.navigate(['/login']);
                  console.log(res);
                  this.emailService.sendConfirmationEmail(this.form.value.email).subscribe(
                    (response: any) => {
                      console.log('Confirmation email sent successfully.', response);
                    },
                    (error: any) => {
                      console.error('Error sending confirmation email:', error);
                    }
                  );
                },
                (err) => {
                  console.log(err);
                }
              );
            }
          },
          (error) => {
            console.log("Error checking for duplicate user:", error);
          }
        );
      }
      this.showAlert = false;
    } else {
      this.showAlert = true;
    }
  }
  
}
