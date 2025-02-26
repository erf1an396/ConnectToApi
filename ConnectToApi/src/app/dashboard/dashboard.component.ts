import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterOutlet , RouterLink } from '@angular/router';
import { Route } from '@angular/router';
import { ExpenseService, MonthlyFinanceDto } from '../services/expense.service';
import { jwtDecode } from 'jwt-decode';
import {Chart,ChartData , ChartOptions, ChartType} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import {ApexOptions} from 'apexcharts';
import {ApexTitleSubtitle, NgApexchartsModule} from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  
} from "ng-apexcharts";
import { FinanceComponent } from "./finance/finance.component";
import { PieComponent } from "./pie/pie.component";




@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterOutlet, NgApexchartsModule, FinanceComponent, PieComponent],
  templateUrl: './dashboard.component.html',
  
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  
  transactions: any[] = [];
  totalIncome: number = 0;
  totalExpense: number = 0;
  balance: number = 0;

  

  public chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350
    } as ApexChart,
    title: {
      text: 'درآمد و هزینه ماهانه'
    } as ApexTitleSubtitle,
    xaxis: {
      categories: []
    } as ApexXAxis,
    yaxis: {
      title: {
        text: 'مقدار (تومان)'
      }
    } as ApexYAxis,
    series: []
  };


  public series!: ApexAxisChartSeries;
  public chart!: ApexChart;
  public dataLabels!: ApexDataLabels;
  public title! : ApexTitleSubtitle;
  public markers!: ApexMarkers;
  public fill!: ApexFill;
  public yaxis!: ApexYAxis;
  public xaxis!: ApexXAxis;
  public tooltip!: ApexTooltip;
  public apexStroke!: ApexStroke;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    
     
      
      this.loadChart();
      
  }

 

  loadExpenses() {
    const UserId = this.getUserIdFromToken();
    this.expenseService.getExpenseSummary(UserId!).subscribe((data: any) => {
      this.transactions = data.Transaction;
      this.totalExpense = data.TotalExpense;
      this.balance = data.Balance;
      this.totalIncome = data.TotalIncome;
      console.log(this.totalExpense, this.totalIncome, this.balance);
    });
  }

   public getUserIdFromToken(): string | null {
    const token = localStorage.getItem('JwtToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken['nameid'];
    }
    return null;
  }




  loadChart() {
    const UserId = this.getUserIdFromToken();
    this.expenseService.getMonthlyFinance(UserId!).subscribe((data: MonthlyFinanceDto[]) => {
  
      this.xaxis = {
        categories : data.map(d => `${d.year}-${d.month}`)
      },
      this.chart =  {
        type: 'bar',
        height: 350
      },
      this.yaxis = {
        title: {
          text: 'مقدار (تومان)',
          
        }
      } 
      ,
      this.title = {
        text: 'درآمد و هزینه ماهانه'
        
      }
      ,
      this.series = [
        
          { name: 'درآمد', data: data.map(d => d.totalRevenue)  , color: '#03fc3d' },
          { name: 'هزینه', data: data.map(d => d.totalExpense) , color : '#fc0339' }
      ]
    });
  }
  
  }
