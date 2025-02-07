import { Component } from '@angular/core';
import { TransactionFormComponent } from "./transaction-form/transaction-form.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-details',
  imports: [TransactionFormComponent , CommonModule],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.css'
})
export class TransactionDetailsComponent {

}
