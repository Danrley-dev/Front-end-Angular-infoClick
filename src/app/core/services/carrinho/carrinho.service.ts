import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ItemCarrinho } from '../../models/item-carrinho';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  cartItems: ItemCarrinho[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  // storage: Storage = sessionStorage;
  storage: Storage = localStorage;

  constructor() {

    let data = JSON.parse(this.storage.getItem('cartItems')!);
    if (data) {
      this.cartItems = data;
    }

    this.computeCartTotals();
   }

  addToCart(theCartItem: ItemCarrinho) {

    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem!: ItemCarrinho ;

    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id
      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id === theCartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }
      }
      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      // increment the quantity
      existingCartItem.quantidade++;
    }
    else {
      // just add the item to the array
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }

  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantidade * currentCartItem.preco_unidade!;
      totalQuantityValue += currentCartItem.quantidade;    }

    // publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);

    this.persistCartItems();
  }

  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }


  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantidade * tempCartItem.preco_unidade!;
      console.log(`Nome: ${tempCartItem.name}, quantidade=${tempCartItem.quantidade}, preco unitario=${tempCartItem.preco_unidade}, Sub Total=${subTotalPrice}`);
    }

    console.log(`Preço Total: ${totalPriceValue.toFixed(2)}, Quantidade: ${totalQuantityValue}`);
    console.log('----');
  }

  decrementQuantity(item: ItemCarrinho) {

    item.quantidade--;

    if (item.quantidade === 0) {
      this.removeItem(item);
    }
    else {
      this.computeCartTotals();
    }
  }

  removeItem(item: ItemCarrinho) {
      const itemIndex = this.cartItems.findIndex(tempItem => tempItem.id === item.id);
      if (itemIndex > -1) {
        this.cartItems.splice(itemIndex, 1);
        this.computeCartTotals();
      }
  }
}
