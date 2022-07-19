import { AuthService } from 'src/app/core/services/auth/auth.service';
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


  dias: number = 19;
  horas: number = 22;
  minutos: number = 14;
  segundos: number = 4;

  storage: Storage = localStorage;

  images = ['../../assets/img/HP1.png', '../../assets/img/HP1-RESP.png', '../../assets/img/HP1-RESP(420).png', '../../assets/img/HP1-RESP(720).png', '../../assets/img/HP2.png', '../../assets/img/HP2-RESP.png', '../../assets/img/HP2-RESP(420).png', '../../assets/img/HP2-RESP(720).png', '../../assets/img/HP3.png', '../../assets/img/HP3-RESP.png', '../../assets/img/HP3-RESP(410).png', '../../assets/img/HP3-RESP(720).png']
  constructor(private produtoService: ProdutoService, private carrinhoService: CarrinhoService,
     private route: ActivatedRoute,
     private dialog: MatDialog, private toast: HotToastService, private auhtService: AuthService) {


     }

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



  countDown() {
    const x = setInterval(() => {
      if (this.segundos > 0) {
        this.segundos--;
      } else if (this.minutos > 0) {
        this.minutos--;
        this.segundos = 59;
      } else if (this.horas > 0) {
        this.horas--;
        this.minutos = 59;
        this.segundos = 59;
      } else if (this.dias > 0) {
        this.dias--;
        this.horas = 23;
        this.minutos = 59;
        this.segundos = 59;
      }

      if (
        this.dias === 0 &&
        this.horas === 0 &&
        this.minutos === 0 &&
        this.segundos === 0
      ) {

        clearInterval(x);
      }
    }, 1000);

  }


  ngOnInit(): void {


    this.route.paramMap.subscribe(() => {
      this.handleListaProdutos();
    });
    // this.handleListaProdutos();

    this.MostraProdutosNaLoja();

    this.countDown();
    // this.onClickDialogHome();
  }

}
