import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {jwtDecode} from 'jwt-decode'

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  NgApexchartsModule
} from "ng-apexcharts";
import { ExpenseService, MonthlyFinanceDto } from '../../services/expense.service';
import { stringify } from 'querystring';
import { ChartOptions, Colors } from 'chart.js';
import { ApexOptions } from 'apexcharts';

@Component({
  selector: 'app-pie',
  imports: [CommonModule, RouterOutlet ,NgApexchartsModule ],
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.css'
})
export class PieComponent implements OnInit {

  public series!: ApexNonAxisChartSeries;
      public chart!: ApexChart;
      public dataLabels!: any;
      public title! : ApexTitleSubtitle;
      public markers!: ApexMarkers;
      public fill!: ApexFill;
      public yaxis!: ApexYAxis;
      public xaxis!: ApexXAxis;
      public tooltip!: ApexTooltip;
      public apexStroke!: ApexStroke;
      public plotOption! : ApexPlotOptions;
      public legend! : ApexLegend;
      public responsive! : ApexResponsive[];
      public option! :ApexOptions;
      
      
       

      constructor(private expenseService:ExpenseService){}


      public getUserIdFromToken(): string | null {
            const token = localStorage.getItem('JwtToken');
            if (token) {
              const decodedToken: any = jwtDecode(token);
              return decodedToken['nameid'];
            }
            return null;
          }


      ngOnInit(): void {
          this.loadChart();
      }


  loadChart() {
    const UserId = this.getUserIdFromToken();
    this.expenseService.getMonthlyFinance(UserId!).subscribe((data:MonthlyFinanceDto[]) => {

    

      this.series = [data[0].totalExpense,data[0].totalRevenue  ],
      
      this.chart =  {
        width: 380,
        type: "donut",
        
        
      },
      this.fill = {
        colors : ["#f00e38" , "#37f502"  ]
      }
      
      this.dataLabels = ["هزینه", "درامد"],
      
      this.responsive = [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }

        
      ]
      

    })
    
    
    };
  }


  
