export type Card = {
    cardID:number;
    cardAccount:number;
    maskedCardNumber:number;
    expireDate:string;
    currency:string;
    status:string;
    balance:number;
}

export type Transaction = {
    occupation:string;
    amount:number;
    card:number;
}