import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from './transaction.model';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class TransactionService {

  constructor(private http:HttpClient) { }



  private ApiUrl = 'https://localhost:7078/api/Expense';

  private transactions: Transaction[] = [];

  
  

  getTransactions(userid :string): Observable<Transaction[]> {

      const token = localStorage.getItem('JwtToken'); 
  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}` 
      });
  
      return this.http.get<Transaction[]>(`https://localhost:7078/api/Expense/${userid}`, {headers}); 
  
  }

  addTransaction(transaction: any): Observable<Transaction> {
    
    const token = localStorage.getItem('JwtToken')
    const headers = new HttpHeaders({
      'Authorization' :`Bearer ${token}`
    });

    console.log(token)
    
    console.log(transaction,  {headers})

    return this.http.post<any>(this.ApiUrl, transaction ,{headers});

    
  }

  deleteTransaction(id: number): Observable<any> {

    const token = localStorage.getItem('JwtToken')
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    })

    return this.http.delete<any>(`${this.ApiUrl}/${id}`, {headers});
  }


  

}
