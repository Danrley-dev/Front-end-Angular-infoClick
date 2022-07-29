import { Component, OnInit } from '@angular/core';
import { ConsumidorService } from 'src/app/core/services/consumidor/consumidor.service';

@Component({
  selector: 'app-graficoConsumidor',
  templateUrl: './graficoConsumidor.component.html',
  styleUrls: ['./graficoConsumidor.component.scss']
})
export class GraficoConsumidorComponent implements OnInit {

  numeroMes!: number


  janeiro?: number ;
  fevereiro?: number = 2;
  julho?: number = 7;
  single?: any[];

  width: number = 700;
  height: number = 300;
  fitContainer: boolean = false;
  view: [number, number] = [600, 400];
  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  legendTitle = 'Legenda';
  showXAxisLabel = true;
  xAxisLabel = 'Meses';
  showYAxisLabel = true;
  yAxisLabel = 'Quantidade';
  timeline = true;
  doughnut = true;
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };
  //pie
  showLabels = true;


  constructor(private consumidorService: ConsumidorService) { }


  ngOnInit(): void {



    console.log(this.julho);
    this.consumidorService.getConsumidorMesBy( this.julho!)
      .subscribe(
        (response) => {
          this.julho = response;
          this.single = [
            {
              name: 'Janeiro',
              value: 0
            },
            {
              name: 'Fevereiro',
              value: 0

            },
            {
              name: 'Marco',
              value: 0
            },
            {
              name: 'Abril',
              value: 0
            },
            {
              name: 'Maio',
              value: 0
            },
            {
              name: 'Junho',
              value: 0
            },
            {
              name: 'Julho',
              value: this.julho
            },

          ];

        }
      );




  }

}
