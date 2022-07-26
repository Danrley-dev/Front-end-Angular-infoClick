import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
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

  @ViewChild('removeModalCarrinho') removeModalCarrinho: any;
  removeIdProduto?: ItemCarrinho;

  constructor(
    private carrinhoService: CarrinhoService,
    private modalService: NgbModal,
    private dialog: MatDialog,
    private toast: HotToastService) { }

  listCartDetails() {

    this.cartitems = this.carrinhoService.cartItems;
    this.carrinhoService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    this.cartitems.sort((a, b) => {
      if (a.loja! < b.loja!) {
        return -1;
      }
      if (a.loja! > b.loja!) {
        return 1;
      }
      return 0;
    }
    );
    this.carrinhoService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
    this.carrinhoService.computeCartTotals();
  }

  incrementQuantity(item: ItemCarrinho) {

    this.carrinhoService.addToCart(item);
    this.toast.success('Foi adicionado mais uma unidade do produto no carrinho',
      {
        position: 'top-right'
      });

  }

  decrementQuantity(item: ItemCarrinho) {
    this.carrinhoService.decrementQuantity(item);
    this.toast.success('Foi retirado uma unidade do produto no carrinho',
      {
        position: 'top-right'
      });
  }

  remove(item: ItemCarrinho) {
    this.removeIdProduto = item;
    return this.modalService.open(this.removeModalCarrinho, { size: 'sm' });
  }

  confirmaRemoveProduto() {
    this.carrinhoService.removeItem(this.removeIdProduto!);
    this.modalService.dismissAll();
    this.toast.success('Produto removido do Carrinho!',
    { position: 'bottom-right' })
  }

  naoRemover() {
    this.modalService.dismissAll();
  }

  ngOnInit(): void {
    this.listCartDetails();
  }
}