import { Component, OnInit, Output, output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Transaction } from '../../services/transaction.model';
import { TransactionService } from '../../services/transaction.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { emit } from 'node:process';

@Component({
  selector: 'app-transaction-form',
  imports: [FormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css',
})
export class TransactionFormComponent implements OnInit {
  transactions: Transaction[] = [];
  newTransaction: Transaction = {
    Id: 0,
    Type: 'واریز',
    Amount: 0,
    Description: '',
    Date: new Date(),
  };

  @Output() transactionsLoadAgain = new EventEmitter<any>();

  constructor(
    private transactionService: TransactionService,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  addTransaction() {
    this.transactionService
      .addTransaction({
        Id: 0,
        Type: this.newTransaction.Type,
        Amount: this.newTransaction.Amount,
        Description: this.newTransaction.Description,
        Date: new Date(),
      })
      .subscribe(() => {
        this.newTransaction = {
          Id: 0,
          Type: 'واریز',
          Amount: 0,
          Description: '',
          Date: new Date(),
        };
        this.transactionsLoadAgain.emit('');
      });
  }

}
