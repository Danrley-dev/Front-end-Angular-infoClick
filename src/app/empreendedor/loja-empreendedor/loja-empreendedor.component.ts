import { CarrinhoService } from 'src/app/core/services/carrinho/carrinho.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Loja } from '../../core/models/loja';
import { Produto } from '../../core/models/produto';
import { LojaService } from 'src/app/core/services/loja/loja.service';
import { ItemCarrinho } from 'src/app/core/models/item-carrinho';
import { HotToastService } from '@ngneat/hot-toast';
import { LojaEditComponent } from '../loja-edit/loja-edit/loja-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth/auth.service';

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
  public isCollapsed = true;
  userEmpreendedor?: boolean;
  userAdmin?: boolean;
  userConsumidor?: boolean;

  constructor(
    private toast: HotToastService,
    private carrinhoService: CarrinhoService,
    private route: ActivatedRoute,
    private lojaService: LojaService,
    private dialog: MatDialog,
    private authService: AuthService
  ) { }


  isAdmin() {
    this.authService.userInfo().subscribe(res => {
      const perfilsBolean = Object.keys(res.perfil!).map(function (key: any) {
        if (res.perfil![key] == 'ADMIN') {
          return true
        }
        return false;
      })
      this.userAdmin = perfilsBolean.includes(true);

   })
  }

  isEmpreendedor() {
   this.authService.userInfo().subscribe(res => {
     const perfilsBolean = Object.keys(res.perfil!).map(function (key: any) {
       if (res.perfil![key] == 'EMPREENDEDOR') {
         return true
       }
       return false;
     })
     this.userEmpreendedor = perfilsBolean.includes(true);

  })
 }

 isConsumidor() {
   this.authService.userInfo().subscribe(res => {
     const perfilsBolean = Object.keys(res.perfil!).map(function (key: any) {
       if (res.perfil![key] == 'CONSUMIDOR') {
         return true
       }
       return false;
     })
     this.userConsumidor = perfilsBolean.includes(true);

  })
 }

  getLojaDetail() {
    const lojaId: number = +this.route.snapshot.paramMap.get('id')!;
    this.lojaService.getLojaId(lojaId).subscribe(
      data => {
        this.loja = data;
      }
    )
  }

  openDialog() {
    this.dialog.open(LojaEditComponent),{width: '640px'};
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

  ngOnInit(): void {
    this.getLojaDetail();
    this.isAdmin()
    this.isEmpreendedor();
    this.isConsumidor();
  }

}
