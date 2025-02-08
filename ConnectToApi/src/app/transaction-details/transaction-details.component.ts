import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionFormComponent } from "./transaction-form/transaction-form.component";
import { CommonModule } from '@angular/common';
import { Transaction } from '../services/transaction.model';
import { TransactionService } from '../services/transaction.service';



@Component({
  selector: 'app-transaction-details',
  imports: [TransactionFormComponent , CommonModule],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.css'
})
export class TransactionDetailsComponent implements OnInit {
  transactions: any[] = [] ;

  

  ngOnInit(): void {
      this.loadTransaction();
  }

  loadTransaction(){
    this.transactions = [];
    this.transactionService.getTransactions().subscribe(data => {
      console.log(data);
      this.transactions = data ;
     
    })
  }
  

  constructor(private transactionService :TransactionService ) {}

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
     
}
