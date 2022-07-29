import { ProdutoService } from './../../../../core/services/produtos/produto.service';
import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/core/models/produto';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit {


  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel?: "Years";
  public showYAxisLabel = true;
  public yAxisLabel?: "Salary";
  public graphDataChart?: any[];

  view: [number, number] = [700, 400];

  julho?: number;
  single?: any[]
  multi?: any[];


  mes?:number;

  // options

  showLabels: boolean = true;
  isDoughnut: boolean = false;



  constructor(private produtoService: ProdutoService) {
    // Object.assign(this, { single });
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {

    this.produtoService.SemanaLength()
      .subscribe(
        (response) => {
          this.julho = response;
          this.single = [
            {
              name: 'Semana',
              value: this.julho
            },
           

          ];

          this.multi = [
            {
              name: 'Semana',
              value: this.julho
            },

          ];

        }
      );

      }

    // this.produtoService.getProdutoMesBy(7).subscribe
    // ( data => {
    //   this.single = data.map(datum => ({ name: datum.name, value: datum.produtoValor  }));
    // });



}
