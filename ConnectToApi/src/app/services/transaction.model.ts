export interface Transaction {
    UserId:string;
    Type:'واریز'|'برداشت';
    Amount:number;
    Description:string;
    Date:Date;
}