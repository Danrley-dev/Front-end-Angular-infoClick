import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { forkJoin } from 'rxjs';
import { DialogHomeComponent } from '../core/components/dialog-home/dialog-home.component';
import { ItemCarrinho } from '../core/models/item-carrinho';
import { Loja } from '../core/models/loja';
import { Produto } from '../core/models/produto';
import { CarrinhoService } from '../core/services/carrinho/carrinho.service';
import { ProdutoService } from '../core/services/produtos/produto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  produtos?: Produto[];
  lojas?: Loja[];
  searchMode?: boolean;
  storage: Storage = localStorage;
  images = [
    '../../assets/img/Group 84.png',
    '../../assets/img/Group 82.png',
    '../../assets/img/Group 83.png'
  ]

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private toast: HotToastService,
  ) { }

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
        this.produtos = response[0].slice(0, 8);
        this.lojas = response[1];
      }
    );
  }

  onClickDialogHome(): void {
    setTimeout(() => {
      this.dialog.open(DialogHomeComponent, {
        width: '640px'
      });
    }, 3000);
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

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleListaProdutos();
    });

    this.MostraProdutosNaLoja();
  }
}
