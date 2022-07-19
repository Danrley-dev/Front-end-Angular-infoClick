import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho/carrinho.service';
import { HotToastService } from '@ngneat/hot-toast';

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
  role = this.authService.userRole();

  constructor(
    private carrinhoService: CarrinhoService,
    private router: Router,
    private authService: AuthService,
    private toast: HotToastService) { }


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
  }

  menuClick() {
    this.menuHamburguer = !this.menuHamburguer;
  }

  ngOnInit(): void {
    this.updateCartStatus();
    this.logged = this.authService.isAuthenticated;
    this.email = this.authService.getEmail();
    this.isAdmin()




  }
}
