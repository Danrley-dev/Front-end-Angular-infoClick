import { Component, OnInit } from '@angular/core';
import { ItemCarrinho } from '../core/models/item-carrinho';
import { CarrinhoService } from '../core/services/carrinho/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit {

  cartitems: ItemCarrinho[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private carrinhoService: CarrinhoService) { }

  listCartDetails() {

    this.cartitems = this.carrinhoService.cartItems;
    this.carrinhoService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.carrinhoService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.carrinhoService.computeCartTotals();

  }

  incrementQuantity(item: ItemCarrinho) {

      this.carrinhoService.addToCart(item);

    }

    decrementQuantity(item: ItemCarrinho) {
        this.carrinhoService.decrementQuantity(item);
      }

    remove(item: ItemCarrinho) {
        this.carrinhoService.removeItem(item);
      }

  ngOnInit(): void {
    this.listCartDetails();

    console.log(this.cartitems);
  }

}
