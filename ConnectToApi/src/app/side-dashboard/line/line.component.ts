import { Component, OnInit } from '@angular/core';
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
  ApexPlotOptions
  
} from "ng-apexcharts";
import { ExpenseService, MonthlyFinanceDto } from '../../services/expense.service';
import { ApexOptions } from 'apexcharts';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-line',
  imports: [NgApexchartsModule , CommonModule],
  templateUrl: './line.component.html',
  styleUrl: './line.component.css'
})
export class LineComponent implements OnInit {


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
    public plotOption! : ApexPlotOptions;



  constructor(private expenseService:ExpenseService){}


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
          this.plotOption = {
            bar: {
              horizontal: false,
              columnWidth: "55%",
              borderRadius : 10
            }
          },
          this.series = [
            
              { name: 'درآمد', data: data.map(d => d.totalRevenue)  , color: '#02a312' },
              { name: 'هزینه', data: data.map(d => d.totalExpense) , color : '#d90723' }
          ]
        });
      }
    

}
