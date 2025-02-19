import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionFormComponent } from "./transaction-form/transaction-form.component";
import { CommonModule } from '@angular/common';
import { Transaction } from '../services/transaction.model';
import { TransactionService } from '../services/transaction.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';



@Component({
  selector: 'app-transaction-details',
  imports: [TransactionFormComponent , CommonModule, RouterOutlet , RouterLink],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.css'
})
export class TransactionDetailsComponent implements OnInit {
  transactions: any[] = [] ;
  roles:string[] = [];

  

  ngOnInit(): void {
    console.log('t1',this.roles);
      this.loadTransaction();
      this.roles = JSON.parse(localStorage.getItem('roles') || '[]');
      console.log('t2',this.roles);
      
  }

  loadTransaction(){
    this.transactions = [];
    const UserId = this.getUserIdFromToken();
    this.transactionService.getTransactions(UserId!).subscribe(data => {
      console.log(data);
      

      this.transactions = data ;
     
    })
  }
  

  constructor(private transactionService :TransactionService  ) {}

     onTransactionsReceived(updatedTransactions:Transaction[]){
      console.log (updatedTransactions)
      this.transactions = updatedTransactions;
      console.log(this.transactions)
     }

     onTransactionDeleted(id:number) {
      this.transactionService.deleteTransaction(id).subscribe(x=> {
        this.loadTransaction();
      })
     }



     getUserIdFromToken():string |null {
         const token = localStorage.getItem('JwtToken')
     
       
           if(token)
           {
     
             const decodedToken: any = jwtDecode(token);
             const UserId = decodedToken['nameid'];
             return UserId ;
     
           }
           
           return null;
         }


     
     
}
