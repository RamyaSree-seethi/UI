import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';

import { AboutusComponent } from './aboutus/aboutus.component';
import { signupComponent } from './signup/signup.component';
import { RoomEditComponent } from './room-edit/room-edit.component';
import { LoginComponent } from './login/login.component';
import { RegisterUsersComponent } from './register-users/register-users.component';
import { RoomsComponent } from './rooms/rooms.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { BookingsComponent } from './bookings/bookings.component';
import { ProfileComponent } from './profile/profile.component';

import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { RoomBookingComponent } from './room-booking/room-booking.component';
import { ContactusComponent } from './contactus/contactus.component';

import { RoomViewComponent } from './room-view/room-view.component';
import { UserService } from './user.service';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { SuccessfulBookingComponent } from './successful-booking/successful-booking.component';
import { RoomListComponent } from './room-list/room-list.component';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { ReviewComponent } from './review/review.component';
import { EditBookingComponent } from './edit-booking/edit-booking.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { RefundRequestComponent } from './refund-request/refund-request.component';
import { DatePipe } from '@angular/common';
import { ModifiedBookingComponent } from './modified-booking/modified-booking.component';
import { RefundEditComponent } from './refund-edit/refund-edit.component';
import { RefundSuccessComponent } from './refund-success/refund-success.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  {path:"aboutus",component:AboutusComponent},
  {path:"signup", component:signupComponent},
  { path: 'rooms/:id/edit', component: RoomEditComponent },
  {path:'login', component:LoginComponent},
  {path:'signup', component:signupComponent},
  {path:'registerUsers', component:RegisterUsersComponent},
  {path:'rooms', component:RoomsComponent},
  {path:'navbar', component:NavbarComponent},
  {path:'index', component:IndexComponent},
  {path:'aboutus', component:AboutusComponent},
  {path:'admindashboard', component:AdminDashboardComponent},
  {path:'customerdashboard', component:CustomerDashboardComponent},
  {path:'bookings', component:BookingsComponent},
  {path:'profile', component:ProfileComponent}, 
  {path:'viewProfile', component:ViewProfileComponent},
  {path:"roomView", component:RoomViewComponent},
  {path:'editProfile/:userId', component:EditProfileComponent},
  {path:'roomBooking', component:RoomBookingComponent}, 
  {path:'contactus', component:ContactusComponent}, 
  { path: 'userbookings', component: UserBookingsComponent },
  { path: 'userbookings/:id', component: UserBookingsComponent },
  { path: 'edit-booking/:id', component: EditBookingComponent }
,
  {
    path: 'user/:id',
    component: NavbarComponent,
  },
  {
    path: 'edit/:id',
    component: RoomEditComponent
  },
  {
    path:'viewProfile/:id', component:ViewProfileComponent
  },

  {path:'successfulBooking', component:SuccessfulBookingComponent},

  {
    path: 'booking/:roomId/:userId',
    component: RoomBookingComponent,
  },
  { path: 'booking/:roomId', component: RoomBookingComponent },

  {
    path: 'user/:id',
    component: RegisterUsersComponent,
  },
  { path: 'booking/:id', component: RoomBookingComponent },
  {
    path: 'navbar/:id',
    component: NavbarComponent,
  },
  {path:'addRoom', component:AddRoomComponent},
  {path:'roomsList',component:RoomListComponent},
  {
    path: 'view-profile/:userId',
    component: ViewProfileComponent
  },
  {path:'userBookings', component:UserBookingsComponent},
  {path:'customerdashboard', component:CustomerDashboardComponent},
  {path:'review', component:ReviewComponent},

  { path: 'editBooking/:id', component:EditBookingComponent },
  {path:'feedbacks', component:FeedbackComponent},
  { path: 'successfulBooking/:bookingId', component: SuccessfulBookingComponent },
  {path:'payment-success', component:PaymentSuccessComponent},
  {path:'refundRequest', component:RefundRequestComponent},
  {
    path: 'successfulBooking/:bookingId',
    component: SuccessfulBookingComponent,
  },
  {
    path: 'modifiedBooking/:bookingId',
    component: ModifiedBookingComponent,
  },{
    path:'editRefund/:refundId', component:RefundEditComponent
  },{
    path:'refundSuccess', component:RefundSuccessComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
 providers:[UserService, DatePipe]
})
export class AppRoutingModule {}
