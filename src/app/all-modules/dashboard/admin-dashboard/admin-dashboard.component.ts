import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
  ApexGrid,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexFill
} from "ng-apexcharts";
export type newTicketChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  grid: ApexGrid
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};
export type solvedTicketChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  grid: ApexGrid
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};
export type openTicketChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  grid: ApexGrid
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};
export type pendingTicketChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  grid: ApexGrid
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};
export type radialBarChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
};
@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"],
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild("newTicketChart") chart: ChartComponent;
  public newTicketChartOptions: Partial<newTicketChartOptions>;
  @ViewChild("solvedTicketChart") solvedchart: ChartComponent;
  public solvedTicketChartOptions: Partial<solvedTicketChartOptions>;
  @ViewChild("openTicketChart") openchart: ChartComponent;
  public openTicketChartOptions: Partial<openTicketChartOptions>;
  @ViewChild("pendingTicketChart") pendingchart: ChartComponent;
  public pendingTicketChartOptions: Partial<pendingTicketChartOptions>;
  @ViewChild("radialBarChart") radialBarchart: ChartComponent;
  public radialBarChartOptions: Partial<radialBarChartOptions>;
  public chartData;
  public chartOptions;
  public lineData;
  public lineOption;
  public barColors = {
    a: "#ff9b44",
    b: "#fc6075",
  };
  public lineColors = {
    a: "#ff9b44",
    b: "#fc6075",
  };

  constructor() {
    this.radialBarChartOptions = {
      series: [70],
			chart: {
			height: 300,
			type: 'radialBar',
			dropShadow: {
				enabled: true,
				blur: 2,
				color: '#000',
				opacity: 0.25
			}
		},
		plotOptions: {
			radialBar: {
				hollow: {
				size: '60%',
				}
			},
		},
		fill: {
			opacity: 1.5,
			colors: ['#F2D096', '#F2D096'],
			type: 'gradient',
			gradient: {
				gradientToColors: ['#F2D096', '#F2D096'],
				shadeIntensity: 1,
				opacityFrom: 1,
				opacityTo: 2,
				stops: [0, 50, 100],
				inverseColors: false
			},
		},
		labels: ['Completed task'],
    };
    this.newTicketChartOptions = {
      series: [{
        name: 'series1',
        color: '#4a7feb',
        data: [31, 40, 28, 51, 42, 109, 100]
      }],
      chart: {
        type: 'area',
        toolbar: {
          show: false
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      xaxis: {
        labels: {
          show: false
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      grid: {
        show: false
      }
    };
    this.solvedTicketChartOptions = {
      series: [{
        name: 'series1',
        color: '#F2D096',
        data: [31, 40, 28, 51, 42, 109, 100]
      }],
      chart: {
        type: 'area',
        toolbar: {
          show: false
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      xaxis: {
        labels: {
          show: false
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      grid: {
        show: false
      }
    };
    this.openTicketChartOptions = {
      series: [{
        name: 'series1',
        color: '#ff0000',
        data: [31, 40, 28, 51, 42, 109, 100]
      }],
      chart: {
        type: 'area',
        toolbar: {
          show: false
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      xaxis: {
        labels: {
          show: false
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      grid: {
        show: false
      }
    };
    this.pendingTicketChartOptions = {
      series: [{
        name: 'series1',
        color: '#4fad4c',
        data: [31, 40, 28, 51, 42, 109, 100]
      }],
      chart: {
        type: 'area',
        toolbar: {
          show: false
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      xaxis: {
        labels: {
          show: false
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      grid: {
        show: false
      }
    };
   }

  ngOnInit() {
    this.chartOptions = {
      xkey: "y",
      ykeys: ["a", "b"],
      labels: ["Total Income", "Total Outcome"],
      barColors: [this.barColors.a, this.barColors.b],
    };

    this.chartData = [
      { y: "2006", a: 100, b: 90 },
      { y: "2007", a: 75, b: 65 },
      { y: "2008", a: 50, b: 40 },
      { y: "2009", a: 75, b: 65 },
      { y: "2010", a: 50, b: 40 },
      { y: "2011", a: 75, b: 65 },
      { y: "2012", a: 100, b: 90 },
    ];

    this.lineOption = {
      xkey: "y",
      ykeys: ["a", "b"],
      labels: ["Total Sales", "Total Revenue"],
      resize: true,
      lineColors: [this.lineColors.a, this.lineColors.b],
    };

    this.lineData = [
      { y: '2006', a: 50, b: 90 },
      { y: '2007', a: 75,  b: 65 },
      { y: '2008', a: 50,  b: 40 },
      { y: '2009', a: 75,  b: 65 },
      { y: '2010', a: 50,  b: 40 },
      { y: '2011', a: 75,  b: 65 },
      { y: '2012', a: 100, b: 50 }
    ];
  }
}
