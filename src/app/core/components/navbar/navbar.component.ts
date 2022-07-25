import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho/carrinho.service';
import { HotToastService } from '@ngneat/hot-toast';
import { EmpreendedorService } from '../../services/empreendedor/empreendedor.service';
import { LojaService } from '../../services/loja/loja.service';
import { Loja } from '../../models/loja';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  menuHamburguer = false;

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  logged?: boolean;
  email?: string;
  userEmpreendedor?: boolean;
  userAdmin?: boolean;
  userConsumidor?: boolean;
  idEmpreendedor?:number;
  idLoja?:number;
  role = this.authService.userRole();
  sumir = true;

  constructor(
    private carrinhoService: CarrinhoService,
    private router: Router,
    private authService: AuthService,
    private toast: HotToastService,
    private empreendedorService: EmpreendedorService,
    private lojaService: LojaService
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

  pesquisar(value: string) {
    console.log(`value:${value}`);
    this.router.navigateByUrl(`/pesquisar/${value}`);
  }

  updateCartStatus() {
    this.carrinhoService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    this.carrinhoService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }

  logout() {
    this.router.navigate(["login"])
    this.authService.logout();
    this.toast.info('Logout realizado com sucesso!')
    window.location.reload();
  }

  menuClick() {
    this.menuHamburguer = !this.menuHamburguer;
  }

  rota(){
    this.router.navigate([`/loja-empreendedor/${this.idEmpreendedor}`])
  }

  ngOnInit(): void {
    this.empreendedorService.getEmpreendorIdByEmail(localStorage.getItem('email')!).subscribe((idEmpreendedor => {
      this.idEmpreendedor = idEmpreendedor;
    }))

    this.lojaService.findLojaById(localStorage.getItem('email')!).subscribe((idLoja =>{
      this.idLoja = idLoja;
      if(this.idLoja == this.idEmpreendedor){
       this.sumir = false
      }
    }))

    this.updateCartStatus();
    this.logged = this.authService.isAuthenticated;
    this.email = this.authService.getEmail();
    this.isAdmin()
    this.isEmpreendedor();
    this.isConsumidor();
  }
}
