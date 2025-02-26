import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ApexOptions} from 'apexcharts';
import { jwtDecode } from 'jwt-decode';
import {ApexTitleSubtitle, ChartComponent, NgApexchartsModule} from 'ng-apexcharts';
import { DashboardComponent } from '../dashboard.component';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip, 

  
} from "ng-apexcharts";
import { ExpenseService, MonthlyFinanceDto } from '../../services/expense.service';




export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};



@Component({
  selector: 'app-finance',
  imports: [NgApexchartsModule , CommonModule , RouterOutlet , CommonModule],
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.css'
})
export class FinanceComponent implements OnInit {
  


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
    public plotOption! : ApexPlotOptions;
    public legend! : ApexLegend;

  
 

  constructor(private expenseService:ExpenseService){
    
  }

  ngOnInit(): void {
      this.loadChart();
      
      
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
    this.expenseService.getMonthlyFinance(UserId!).subscribe((data:MonthlyFinanceDto[]) => {
      this.series= [
        {
          name: "درآمد",
         data: data.map(d => d.totalRevenue) 
        },
        {
          name: "هزینه",
          data:  data.map(d => d.totalExpense)
        }
        
      ],
  
      this.chart = {
        type: "bar",
        height: 350
      },
      this.plotOption = {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius : 10
        }
      },
      this.dataLabels =  {
        enabled: false
      },
      this.apexStroke =  {
        show: true,
        width: 2,
        colors: ["transparent"]
      },

      this.xaxis = {
        categories : data.map(d => `${d.year}-${d.month}`)
      },
      this.yaxis = {
        title: {
          text: 'مقدار (تومان)',
          
        }
      } ,
      this.fill =  {
        opacity: 1
      },
      this.tooltip =  {
        y: {
          formatter: function(val) {
            return "$ " + val + " thousands";
          }
        }
      },
      this.legend = {}
    }
    
      

  )
   

}}
