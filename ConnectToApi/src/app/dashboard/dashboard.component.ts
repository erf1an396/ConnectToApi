import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet , RouterLink } from '@angular/router';
import { Route } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
