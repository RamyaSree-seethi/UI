import { Component } from '@angular/core';
import { DeletedRefundService } from '../deleted-refund.service';
import { Refund } from '../refund';

@Component({
  selector: 'app-refund-success',
  templateUrl: './refund-success.component.html',
  styleUrls: ['./refund-success.component.css']
})
export class RefundSuccessComponent {
  constructor(private deletedRefundService: DeletedRefundService) {}
  deletedRefunds: Refund[] = []; 
ngOnInit(): void {
  this.deletedRefundService.deletedRefunds$.subscribe((deletedRefunds) => {
    // Use the deleted refund data in this component
    console.log('Deleted Refunds:', deletedRefunds);
  });
}

}
