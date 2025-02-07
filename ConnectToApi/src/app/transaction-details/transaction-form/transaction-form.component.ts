import { Component, OnInit, Output, output } from '@angular/core';
import {FormsModule, NgForm, NgModel} from '@angular/forms';
import { Transaction } from '../../services/transaction.model';
import { TransactionService } from '../../services/transaction.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-transaction-form',
  imports: [FormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent implements OnInit {

 @Output()  transactions: Transaction[] = [];
  newTransaction : Transaction = {UserId:'0' , Type:'واریز' , Amount:0 , Description:'', Date:new Date()};

  constructor(private transactionService:TransactionService , private http:HttpClient)
{}



ngOnInit() {
    this.loadTransaction();
}

loadTransaction(){
  this.transactionService.getTransactions().subscribe(data => {
    this.transactions = data ;
  })
}

addTransaction(){
  this.transactionService.addTransaction(this.newTransaction).subscribe(()=>{
    this.loadTransaction();
    this.newTransaction = {UserId:'0' , Type:'واریز' , Amount:0 , Description:'', Date:new Date()};

  });
}

deleteTransaction(id:number)
{
  this.transactionService.deleteTransaction(id).subscribe(() => {
    this.loadTransaction();
  })
}

}
