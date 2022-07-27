import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Loja } from 'src/app/core/models/loja';
import { Produto, Promocao } from 'src/app/core/models/produto';
import { ProdutoService } from 'src/app/core/services/produtos/produto.service';
import { forkJoin } from 'rxjs';
import { CarrinhoService } from 'src/app/core/services/carrinho/carrinho.service';
import { ItemCarrinho } from 'src/app/core/models/item-carrinho';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-produtos-list',
  templateUrl: './produtos-list.component.html',
  styleUrls: ['./produtos-list.component.scss']
})
export class ProdutosListComponent implements OnInit {

  filtro = true;
  images = ['../../../../assets/img/2.png', '../../../../assets/img/5.png', '../../../../assets/img/6.png']

  produtos?: Produto[];
  lojas?: Loja[];
  categoriaId?: number;
  searchMode?: boolean;

  constructor(private produtoService: ProdutoService,
    private route: ActivatedRoute, private carrinhoService: CarrinhoService, private toast: HotToastService,) { }

  addToCart(produto: Produto) {

    const itemCarrinho = new ItemCarrinho(produto);
    this.carrinhoService.addToCart(itemCarrinho);
    this.toast.success('Produto adicionado no carrinho!',
      {
        position: 'bottom-right',
      });
  }

  MostraProdutosNaLoja() {
    forkJoin([this.produtoService.listaProdutos(), this.produtoService.listaLojas()]).subscribe(
      (response) => {
        this.produtos = response[0];
        this.lojas = response[1];
      }
    );
  }

  handleProcuraProdutos() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.produtoService.searchProdutos(this.route.snapshot.paramMap.get('keyword')!).subscribe(
        (response) => {
          this.produtos = response;
        }
      );
    }
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
      this.listaProdutos();
    }
  }

  handleListProdutos() {
    const getCategoriaId: boolean = this.route.snapshot.paramMap.has('id');
    if (getCategoriaId) {

      this.categoriaId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.categoriaId = 1;
      // this.produtoService.listaProdutos().subscribe((data) => {
      //   this.produtos = data;
      // });
    }
    this.produtoService.getProdutoCategory(this.categoriaId).subscribe((data) => {
      this.produtos = data;
    });
  }

  listaProdutos() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    this.categoriaId = +this.route.snapshot.paramMap.get('id')!;


    if (this.categoriaId) {
      this.handleListProdutos();
    }

    else {
      this.produtoService.listaProdutos().subscribe((data) => {
        this.produtos = data;
      });
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

    // this.MostraProdutosNaLoja();
  }

}