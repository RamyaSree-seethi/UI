import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { NavigationService } from '../navigation.service';
import { Router } from '@angular/router';

// Define the emailValidator function here
function emailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const email = control.value;
    if (email && !email.endsWith('@gmail.com')) {
      return { invalidEmail: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-login',
  template: `
  <button (click)="navigateToNewRoute()">Go to New Route</button>
  <button (click)="goBack()">Go Back</button>
`,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private navigationService: NavigationService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, emailValidator()]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  Login(): void {
    if (this.loginForm) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      const url = 'http://localhost:52612/api/RegisterUsers/' + email + '/' + password;

      this.http.get<any>(url).subscribe(
        (data) => {
          console.log(data);

          if (!data) {
            console.error('Data is undefined:', data);
            alert('An unexpected error occurred. Please try again later.');
            return;
          }
          if (data.Email === '') {
            alert('Enter the email!!');
          }

          if (data.Status === 'Error') {
            alert(data.Message);
          } else {
            const lowerCaseEmail = email.toLowerCase();

            if (lowerCaseEmail === 'admin@gmail.com' && password === 'admin@12345') {
              localStorage.setItem('User', JSON.stringify(data));
              window.location.href = '/admindashboard';
            } else {
              localStorage.setItem('User', JSON.stringify(data));
              window.location.href = '/customerdashboard';
            }
          }
        },
        (error: HttpErrorResponse) => {
          console.error('HTTP Error:', error);
          if (error.status === 404) {
            alert('Please enter the email!!.');
          } else {
            alert('Please enter the password!!');
          }
        }
      );
    }
  }
}

