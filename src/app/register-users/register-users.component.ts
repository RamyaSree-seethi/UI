import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-register-users',
  templateUrl: './register-users.component.html',
  styleUrls: ['./register-users.component.css'],
})
export class RegisterUsersComponent implements OnInit {
  regUsers!: Observable<User[]>;
  Users: User[] = [];
  searchText: string = '';
  filteredUsers: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.regUsers = this.userService.getAll();

    this.regUsers.subscribe((res) => {
      this.Users = res;
      this.filteredUsers = this.Users;
    });
  }

  filterUsers(): void {
    this.filteredUsers = this.Users.filter((user) =>
      user.userName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.phoneNumber.includes(this.searchText)
    );
  }

  deleteUser(user: User): void {
    // Call the deleteUser method from your UserService to delete the user permanently
    this.userService.deleteUser(user.userId).subscribe(() => {
      // Update the local array if the server deletion was successful
      const index = this.filteredUsers.indexOf(user);
      if (index !== -1) {
        this.filteredUsers.splice(index, 1);
      }
    });
  }
}
