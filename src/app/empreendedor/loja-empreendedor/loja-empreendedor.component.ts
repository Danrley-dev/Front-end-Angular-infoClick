import { ProdutoService } from 'src/app/core/services/produtos/produto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Loja } from '../../core/models/loja';
import { EmpreendedorService } from '../../core/services/empreendedor/empreendedor.service';
import { forkJoin } from 'rxjs';
import { Produto } from '../../core/models/produto';
import { LojaService } from 'src/app/core/services/loja/loja.service';

@Component({
  selector: 'app-loja-empreendedor',
  templateUrl: './loja-empreendedor.component.html',
  styleUrls: ['./loja-empreendedor.component.scss']
})
export class LojaEmpreendedorComponent implements OnInit {

  loja: Loja = new Loja();
  produto: Produto = new Produto();
  lojas: Loja[] = [];
  opGerencia = false;

  constructor(private produtoService: ProdutoService , private route: ActivatedRoute, private lojaService: LojaService) { }

  getLojaDetail( ) {
    const lojaId: number = +this.route.snapshot.paramMap.get('id')!;
    this.lojaService.getLojaId(lojaId).subscribe(
      data => {
        this.loja = data;
      }
    )
  }

  clickOpcoes() {
    this.opGerencia = !this.opGerencia;
  }

  public isCollapsed = true;
  ngOnInit(): void {

    this.getLojaDetail();
    console.log(this.loja);
  }

}
