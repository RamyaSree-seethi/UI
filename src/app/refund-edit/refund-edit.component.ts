import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RefundService } from '../refund.service';
import { Refund } from '../refund';

@Component({
  selector: 'app-refund-edit',
  templateUrl: './refund-edit.component.html',
  styleUrls: ['./refund-edit.component.css']
})
export class RefundEditComponent {
  profileForm!: FormGroup; // Declare a FormGroup for your form
  refundId!: number;
  refund!:Refund;
 
  constructor(private fb: FormBuilder, private route:ActivatedRoute, private refundService:RefundService) {
  
  }

  ngOnInit(): void {
     // Initialize the form using FormBuilder
     this.profileForm = this.fb.group({
      refundId: ['', Validators.required],
      bookingId: ['', Validators.required],
      amount: ['', Validators.required],
      requestDate:['', Validators.required],
     
      isProcessed: ['', Validators.required],
     
    });
    this.route.params.subscribe((params)=> {
      this.refundId=+params['refundId'];
      console.log(this.refundId)
    });
    this.fetchRefundData();
    
  }

  
  submitForm(): void {
    const formData= this.profileForm.value;
    console.log(formData);
    this.refundService.updateRefund(this.refundId, formData).subscribe((res)=>
    {
    console.log("RefundUpdated Succesfully!!", res)
    },
    (err)=> {
      console.log(err);
    }) 
   
  }
  fetchRefundData() {
    this.refundService.getRefundById(this.refundId).subscribe(
      (res) => {
        this.refund = res; // Store the fetched refund in the 'refund' property
        this.profileForm.patchValue(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
