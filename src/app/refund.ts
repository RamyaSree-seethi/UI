export interface Refund {
    refundId:number;
    bookingId:number;
    amount:number;
    requestDate:Date;
    isProcessed:boolean;
    processedDate:Date;
}