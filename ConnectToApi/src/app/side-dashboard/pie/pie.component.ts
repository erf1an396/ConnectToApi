import { Component } from '@angular/core';
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
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pie',
  imports: [NgApexchartsModule , CommonModule , RouterOutlet],
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.css'
})
export class PieComponent {


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
              colors : ["#d9ce04" , "#6d00b5"  ]
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
