import { ProdutoService } from 'src/app/core/services/produtos/produto.service';
import { Component, OnInit } from '@angular/core';
import { map, pipe } from 'rxjs';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent implements OnInit {

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


  constructor(private produtoService: ProdutoService) { }


  ngOnInit(): void {



    console.log(this.julho);
    this.produtoService.getProdutoMesBy( this.julho!)
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
