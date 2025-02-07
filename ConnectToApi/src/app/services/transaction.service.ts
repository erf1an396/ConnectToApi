import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from './transaction.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class TransactionService {

  constructor(private http:HttpClient) { }



  private ApiUrl = 'https://localhost:7078/api/Expense';

  private transactions: Transaction[] = [];

  getTransactions(): Observable<Transaction[]> {
      const token = localStorage.getItem('jwtToken'); 
  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}` 
      });
  
      return this.http.get<Transaction[]>(this.ApiUrl, { headers }); 
  
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    const token = localStorage.getItem('JwtToken')
    const headers = new HttpHeaders({
      'Authorization' :`Bearer ${token}`
    });

    return this.http.post<Transaction>(this.ApiUrl, transaction ,{headers});
  }

  deleteTransaction(id: number): Observable<void> {

    const token = localStorage.getItem('JwtToken')
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    })

    return this.http.delete<void>(`${this.ApiUrl}/${id}`, {headers});
  }
}
