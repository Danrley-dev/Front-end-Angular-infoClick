import { Component, OnInit } from '@angular/core';
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

  constructor(private carrinhoService: CarrinhoService) { }

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
