import { ProdutoService } from 'src/app/core/services/produtos/produto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Loja } from '../core/models/loja';
import { EmpreendedorService } from '../core/services/empreendedor/empreendedor.service';
import { forkJoin } from 'rxjs';
import { Produto } from '../core/models/produto';

@Component({
  selector: 'app-loja-empreendedor',
  templateUrl: './loja-empreendedor.component.html',
  styleUrls: ['./loja-empreendedor.component.scss']
})
export class LojaEmpreendedorComponent implements OnInit {

  loja: Loja = new Loja();
  produto: Produto = new Produto();
  lojas: Loja[] = [];


  constructor(private produtoService: ProdutoService , private route: ActivatedRoute, private empreendedorService: EmpreendedorService) { }

  getLojaDetail( ) {
    const lojaId: number = +this.route.snapshot.paramMap.get('id')!;
    this.empreendedorService.getLojaId(lojaId).subscribe(
      data => {
        this.loja = data;
      }
    )
  }

 



  public isCollapsed = true;
  ngOnInit(): void {

    this.getLojaDetail();
    console.log(this.loja);
  }

}
