import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho/carrinho.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  menuHamburguer = false;

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private carrinhoService: CarrinhoService, private router: Router) { }

  pesquisar(value: string){
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

  menuClick() {
    this.menuHamburguer = !this.menuHamburguer;
  }
  ngOnInit(): void {
    this.updateCartStatus();
  }

}
