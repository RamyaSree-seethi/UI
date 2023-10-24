import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../navigation.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navigation-buttons',
  templateUrl: './navigation-buttons.component.html',
  styleUrls: ['./navigation-buttons.component.css']
})
export class NavigationButtonsComponent {

  constructor(private navigationService: NavigationService, private router: Router, private location: Location) {}
  goBack(): void {
    this.location.back();
  }
}
