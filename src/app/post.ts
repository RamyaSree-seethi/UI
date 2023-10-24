
export interface Post{
bookingId: number;
    userId: number;
    roomId: number;
    
    checkInDate:Date;
    checkOutDate:Date;
    adultsCount:number;
    childCount:number;
    price:number;  
}
