export interface Transaction {
    Id : number
    Type:'واریز'|'برداشت';
    Amount:number;
    Description:string;
    Date:Date;
}