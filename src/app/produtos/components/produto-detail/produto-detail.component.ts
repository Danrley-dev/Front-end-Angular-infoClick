import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { ItemCarrinho } from 'src/app/core/models/item-carrinho';
import { Loja } from 'src/app/core/models/loja';
import { Produto } from 'src/app/core/models/produto';
import { CarrinhoService } from 'src/app/core/services/carrinho/carrinho.service';
import { ProdutoService } from 'src/app/core/services/produtos/produto.service';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.component.html',
  styleUrls: ['./produto-detail.component.scss']
})
export class ProdutoDetailComponent implements OnInit {

  images = ['../../../../assets/img/3.png', '../../../../assets/img/4.png', '../../../../assets/img/1.png']

  produto: Produto = new Produto();
  loja: Loja = new Loja();

  constructor(private produtoService: ProdutoService, private route: ActivatedRoute, private carrinhoService: CarrinhoService, private toast: HotToastService) { }

  addToCart(produto: Produto) {

    const itemCarrinho = new ItemCarrinho(produto);
    this.carrinhoService.addToCart(itemCarrinho);
  }

  produtoDetalhe(){
    const produtoId: number = +this.route.snapshot.paramMap.get('id')!;

    this.produtoService.getProdutoDetail(produtoId).subscribe(
      data => {
        this.produto = data;

      });
  }

  getLojaDetail(){
    const produtoId: number = +this.route.snapshot.paramMap.get('id')!;

    this.produtoService.getLojaDetail(produtoId).subscribe(
      data => {
        this.loja = data;
      }
    )
  }

  ngOnInit(): void {

    console.log(this.produto);
    this.route.paramMap.subscribe(()=> {
      this.produtoDetalhe();

    })
  }

}
