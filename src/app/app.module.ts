import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutusComponent } from './aboutus/aboutus.component';
import { LocalStorage } from 'ngx-webstorage';
import { HomeComponent } from './home/home.component';
import { RegisterUsersComponent } from './register-users/register-users.component';
import { LoginComponent } from './login/login.component';
import { signupComponent } from './signup/signup.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomEditComponent } from './room-edit/room-edit.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { BookingsComponent } from './bookings/bookings.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { RoomBookingComponent } from './room-booking/room-booking.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PostService } from './post.service';
import { LocalStorageService } from 'ngx-webstorage';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component';
import { RoomViewComponent } from './room-view/room-view.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { PasswordMaskPipe } from './password-mask.pipe';
import { SuccessfulBookingComponent } from './successful-booking/successful-booking.component';
import { RoomAvailabilityComponent } from './room-availability/room-availability.component';
import { RoomListComponent } from './room-list/room-list.component';

import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { ReviewComponent } from './review/review.component';
import { StarRatingPipe } from './star-rating.pipe';
import { MenuComponent } from './menu/menu.component';
import { EditBookingComponent } from './edit-booking/edit-booking.component';
import { NavigationButtonsComponent } from './navigation-buttons/navigation-buttons.component';
import { NavigationService } from './navigation.service';
import { EmailService } from './email-service.service';
import { FeedbackComponent } from './feedback/feedback.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { BookingServiceService } from './booking-service.service';
import { RefundRequestComponent } from './refund-request/refund-request.component';
import { ModifiedBookingComponent } from './modified-booking/modified-booking.component';
import { RefundEditComponent } from './refund-edit/refund-edit.component';
import { RefundSuccessComponent } from './refund-success/refund-success.component';




@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavbarComponent,
    AboutusComponent,

    HomeComponent,
    RegisterUsersComponent,
    LoginComponent,
    signupComponent,
    RoomsComponent,
    RoomEditComponent,
    AdminDashboardComponent,
    CustomerDashboardComponent,
    ViewProfileComponent,
    BookingsComponent,
    ContactusComponent,
    ProfileComponent,
    EditProfileComponent,
    RoomBookingComponent,
    RoomViewComponent,

    ViewBookingsComponent,
     AddRoomComponent,
     PasswordMaskPipe,
     SuccessfulBookingComponent,
     RoomAvailabilityComponent,
     RoomListComponent,

     UserBookingsComponent,
     ReviewComponent,
     StarRatingPipe,
     MenuComponent,
     EditBookingComponent,
     NavigationButtonsComponent,
     FeedbackComponent,
     PaymentSuccessComponent,
     RefundRequestComponent,
     ModifiedBookingComponent,
     RefundEditComponent,
     RefundSuccessComponent,
     
     
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,ReactiveFormsModule, BrowserAnimationsModule,FormsModule,
    
    
  
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: (postService: PostService) => () => postService.loadUserData(),
    multi: true,
    deps: [PostService],
    
  },LocalStorageService,
  {
    provide: LocalStorage, // Use LocalStorage here
    useFactory: localStorageFactory,
  },],
  bootstrap: [AppComponent]
})
  

export class AppModule { }
export function localStorageFactory() {
  return localStorage;
}
