import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Loja } from 'src/app/core/models/loja';
import { Produto } from 'src/app/core/models/produto';
import { ProdutoService } from 'src/app/core/services/produtos/produto.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-produtos-list',
  templateUrl: './produtos-list.component.html',
  styleUrls: ['./produtos-list.component.scss']
})
export class ProdutosListComponent implements OnInit {

  filtro = false;
  images = ['../../../../assets/img/2.png', '../../../../assets/img/5.png', '../../../../assets/img/6.png']

  produtos?: Produto[];
  lojas?: Loja[];
  searchMode?: boolean;


  constructor(private produtoService: ProdutoService,
    private route: ActivatedRoute) { }

    MostraProdutosNaLoja() {
      forkJoin([this.produtoService.listaProdutos(), this.produtoService.listaLojas()]).subscribe(
        (response) => {
          this.produtos = response[0];
          this.lojas = response[1];
        }
      );
    }

    handleListaProdutos() {
      this.searchMode = this.route.snapshot.paramMap.has('keyword');

      if (this.searchMode) {
        this.produtoService.searchProdutos(this.route.snapshot.paramMap.get('keyword')!).subscribe(
          (response) => {
            this.produtos = response;
          }
        );
      } else {
        this.MostraProdutosNaLoja();
      }
    }

  filtroClick() {
    this.filtro = !this.filtro;
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(() => {
      this.handleListaProdutos();
    });
    // this.handleListaProdutos();

    this.MostraProdutosNaLoja();
  }

}
