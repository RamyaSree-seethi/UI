import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-index',
  template: `
  <button (click)="navigateToNewRoute()">Go to New Route</button>
  <button (click)="goBack()">Go Back</button>
`,
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent  {
  disableNavigationButtons: boolean = false;
  constructor(private navigationService: NavigationService, private router: Router) {}

  navigateToNewRoute() {
    // Navigate to a new route
    // Push the current route onto the stack
    this.navigationService.pushToStack('/new-route');
  }

  goBack() {
    const previousRoute = this.navigationService.popFromStack();

    if (previousRoute) {
      // Navigate to the previous route
      this.router.navigateByUrl(previousRoute);
    } else {
      // Handle case where the stack is empty (e.g., go to the home page)
      this.router.navigate(['/']);
    }
  }
}
