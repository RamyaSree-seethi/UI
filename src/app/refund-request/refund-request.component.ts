import { Component, ElementRef, ViewChild } from '@angular/core';
import { RefundService } from '../refund.service';
import { Observable } from 'rxjs';
import { Refund } from '../refund';


import * as $ from 'jquery';

import { DatePipe } from '@angular/common';
import { DeletedRefundService } from '../deleted-refund.service';


@Component({
  selector: 'app-refund-request',
  templateUrl: './refund-request.component.html',
  styleUrls: ['./refund-request.component.css'],
  providers:[DatePipe]
})
export class RefundRequestComponent {
  refunds!: Observable<Refund[]>;
  refund: Refund[] = [];
  bookingId!: number;
  amount!: number;
  requestSuccess!: boolean;
  requestError!: string;
  editMode: boolean = false;
  @ViewChild('editRefundModal') editRefundModal!: ElementRef;
  
 
  editedRefund: Refund = {
    refundId: 0, // Assign appropriate values
    bookingId: 0,
    amount: 0,
    requestDate: new Date(), // Use a Date object
    isProcessed: false, // or true, depending on your default value
    processedDate: new Date(), // Use a Date object
  };
  datePipe: any;
  
  constructor(private refundService: RefundService, private deletedRefundService: DeletedRefundService) {}


  ngOnInit(): void {
    this.deletedRefundService.deletedRefunds$.subscribe((deletedRefunds) => {
      // Handle deleted refund data here
      console.log('Deleted Refunds:', deletedRefunds);
    }
    );
    this.refunds = this.refundService.getAll();

    this.refunds.subscribe((res) => {
      this.refund = res;
      console.log(res);
    });
  }
 
  
  // Helper function to format Date as 'yyyy-MM-dd'
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  
// In your RefundRequestComponent

delete(refundId: number) {
  // Call the refundService to delete the refund request
  this.refundService.delete(refundId).subscribe(
    (deletedRefund) => {
      // Store the deleted refund data
      const deletedRefunds = this.deletedRefundService.getDeletedRefunds();
      deletedRefunds.push(deletedRefund);
      this.deletedRefundService.storeDeletedRefunds(deletedRefunds);

      // Remove the deleted refund request from the local array
      this.refund = this.refund.filter((r) => r.refundId !== refundId);
    },
    (error) => {
      console.error('Error deleting refund request:', error);
      // Handle error if needed
    }
  );
}

  

  updateIsProcessed(refund: Refund) {
    console.log('isProcessed value:', refund.isProcessed); // Add this line for debugging
    this.refundService.updateIsProcessed(refund.refundId, refund.isProcessed).subscribe(
      () => {
        // Success message or handling if needed
      },
      (error) => {
        console.error('Error updating isProcessed:', error);
        // Handle error if needed
      }
    );
  }

  onSubmit() {
    this.refundService.initiateRefund(this.bookingId, this.amount).then(
      (response) => {
        // Handle successful refund request
        this.requestSuccess = true;
        this.requestError = '';
      },
      (error) => {
        // Handle refund request error
        this.requestSuccess = false;
        this.requestError = 'Failed to initiate refund. Please try again.';
      }
    );
  }
}
