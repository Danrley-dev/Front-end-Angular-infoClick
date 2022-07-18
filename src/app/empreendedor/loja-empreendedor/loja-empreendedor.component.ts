import { CarrinhoService } from 'src/app/core/services/carrinho/carrinho.service';
import { ProdutoService } from 'src/app/core/services/produtos/produto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Loja } from '../../core/models/loja';
import { EmpreendedorService } from '../../core/services/empreendedor/empreendedor.service';
import { forkJoin } from 'rxjs';
import { Produto } from '../../core/models/produto';
import { LojaService } from 'src/app/core/services/loja/loja.service';
import { ItemCarrinho } from 'src/app/core/models/item-carrinho';
import { HotToastService } from '@ngneat/hot-toast';

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

  constructor(private toast: HotToastService, private carrinhoService: CarrinhoService, private produtoService: ProdutoService , private route: ActivatedRoute, private lojaService: LojaService) { }

  getLojaDetail( ) {
    const lojaId: number = +this.route.snapshot.paramMap.get('id')!;
    this.lojaService.getLojaId(lojaId).subscribe(
      data => {
        this.loja = data;
      }
    )
  }

  addToCart(produto: Produto) {
    const itemCarrinho = new ItemCarrinho(produto);
    this.carrinhoService.addToCart(itemCarrinho);
    this.toast.success('Produto adicionado no carrinho!',
    {
      position: 'bottom-center',
    });
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
