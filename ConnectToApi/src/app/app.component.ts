import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionDetailsComponent } from "./transaction-details/transaction-details.component";
import { FormsModule, NgModel } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet , FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ConnectToApi';
}
