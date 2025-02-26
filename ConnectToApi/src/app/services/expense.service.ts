import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface MonthlyFinanceDto {
  year: number;
  month: number;
  totalRevenue: number;
  totalExpense: number;
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = 'https://localhost:7078/api/expense';

  
  private token = localStorage.getItem('JwtToken');

  constructor(private http:HttpClient) {  }

  getExpenseSummary(userId:string):Observable<any>{
   
    return this.http.get<any>( `${this.apiUrl}/summary/${userId}` , {headers:this.getHeaders()})
  }

  getMonthlyFinance(userId:string):Observable<MonthlyFinanceDto[]> {
    return this.http.get<MonthlyFinanceDto[]> (`${this.apiUrl}/monthly-finance/${userId}` , {headers:this.getHeaders()})
  }



  private getHeaders(){
    return new HttpHeaders({
      'Authorization' : `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
  }
}
