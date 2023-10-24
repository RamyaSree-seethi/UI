import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isSidebarOpen: boolean = false;
  menuItems: MenuItem[] = [];
  IsLoggedIn = false;
  IsAdmin = false;
  IsCustomer = false;
  id!: number;
  menuButtonIcons: string[] = [];

  constructor(private userService: UserService) { }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('User') || '{}');
    this.IsAdmin = userIsAdmin(userData);
    this.IsLoggedIn = Object.keys(userData).length > 0; // Check if userData is not empty

    if (this.IsLoggedIn) {
      this.IsCustomer = !this.IsAdmin;
      this.id = userData.userId;

      if (this.IsAdmin) {
        this.menuItems.push(
          { label: 'Home', iconClass: 'fas fa-home', routerLink: '/home' },
          { label: 'Dashboard', iconClass: 'fas fa-tachometer-alt', routerLink: '/dashboard' },
          { label: 'Rooms List', iconClass: 'fas fa-bed', routerLink: '/roomList' },
          { label: 'Bookings', iconClass: 'fas fa-book', routerLink: '/bookings' },
          { label: 'Register Users', iconClass: 'fas fa-users', routerLink: '/registerusers' },
          { label: 'Profile', iconClass: 'fas fa-user', routerLink: '/profile' },
          { label: 'About Us', iconClass: 'fas fa-info-circle', routerLink: '/aboutus' },
          { label: 'Contact Us', iconClass: 'fas fa-envelope', routerLink: '/contactus' },
          { label: 'Feedback', iconClass: 'fas fa-comment-alt', routerLink: '/review' },
          
        );
      } else {
        this.menuItems.push(
          { label: 'Home', iconClass: 'fas fa-home', routerLink: '/home' },
          { label: 'Rooms List', iconClass: 'fas fa-bed', routerLink: '/roomList' },
          { label: 'Bookings', iconClass: 'fas fa-book', routerLink: '/bookings' },
          { label: 'Profile', iconClass: 'fas fa-user', routerLink: '/profile' },
          { label: 'About Us', iconClass: 'fas fa-info-circle', routerLink: '/aboutus' },
          { label: 'Contact Us', iconClass: 'fas fa-envelope', routerLink: '/contactus' },
          { label: 'Feedback', iconClass: 'fas fa-comment-alt', routerLink: '/review' },
          
        );
      }

      // Add all menu icons to the button
      this.menuButtonIcons = this.menuItems.map((menuItem) => menuItem.iconClass);
    } else {
      // User is not logged in, show the basic menu items
      this.menuItems.push(
        { label: 'Home', iconClass: 'fas fa-home', routerLink: '/home' },
        { label: 'Login', iconClass: 'fas fa-sign-in-alt', routerLink: '/login' },
        { label: 'Signup', iconClass: 'fas fa-user-plus', routerLink: '/signup' },
        { label: 'About Us', iconClass: 'fas fa-info-circle', routerLink: '/aboutus' },
        { label: 'Contact Us', iconClass: 'fas fa-envelope', routerLink: '/contactus' },
        { label: 'Feedback', iconClass: 'fas fa-comment-alt', routerLink: '/review' }
      );

      // Add all menu icons to the button
      this.menuButtonIcons = this.menuItems.map((menuItem) => menuItem.iconClass);
    }
  }

  Logout() {
    localStorage.removeItem('User');
    location.href = '/login';
  }
}

interface MenuItem {
  label: string;
  iconClass: string;
  routerLink: string;
  clickHandler?: () => void;
}

function userIsAdmin(userData: any): boolean {
  return userData.email === 'admin@gmail.com';
}
