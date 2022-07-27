import { CarrinhoService } from 'src/app/core/services/carrinho/carrinho.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loja } from '../../core/models/loja';
import { Produto } from '../../core/models/produto';
import { LojaService } from 'src/app/core/services/loja/loja.service';
import { ItemCarrinho } from 'src/app/core/models/item-carrinho';
import { HotToastService } from '@ngneat/hot-toast';
import { LojaEditComponent } from '../loja-edit/loja-edit/loja-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ProdutoUpdateComponent } from 'src/app/produtos/components/produto-update/produto-update.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpreendedorService } from 'src/app/core/services/empreendedor/empreendedor.service';
import { ProdutoService } from 'src/app/core/services/produtos/produto.service';

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
  botaoGerenciar = false;
  public isCollapsed = true;
  userEmpreendedor?: boolean;
  userAdmin?: boolean;
  userConsumidor?: boolean;
  deleteModalRef!: NgbModal;
  @ViewChild('deleteModal') deleteModal: any;
  deletaIdProduto?: Produto;
  idEmpreendedor?: number;



  constructor(
    private toast: HotToastService,
    private carrinhoService: CarrinhoService,
    private route: ActivatedRoute,
    private router: Router,
    private lojaService: LojaService,
    private dialog: MatDialog,
    private authService: AuthService,
    private modalService: NgbModal,
    private produtoService: ProdutoService,
    private empreendedorService: EmpreendedorService,
  ) { }

  clickOpcoes(){
    this.botaoGerenciar = !this.botaoGerenciar;
  }

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

  showButtonEdit() {
    this.authService.userInfo().subscribe(res => {
      this.idEmpreendedor = res.id;
      if (this.idEmpreendedor == this.loja.idLoja) {
        this.opGerencia = true;
      }
    }
    )
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
    this.dialog.open(LojaEditComponent), { width: '640px' };
  }

  deletarProdutoModal(produto: Produto) {
    this.deletaIdProduto = produto;
    return this.modalService.open(this.deleteModal, { size: 'sm' });
  }

  confirmaDelete() {
    this.produtoService.delete(this.deletaIdProduto?.id!)
      .subscribe(
        {
          next: () => {
            this.getLojaDetail();
            this.modalService.dismissAll();
            this.toast.success('Produto deletado com Sucesso!',
              {
                position: 'bottom-center',
              });
          }
        },
      );
  }

  naoDeletar() {
    this.modalService.dismissAll();
  }

  addToCart(produto: Produto) {
    const itemCarrinho = new ItemCarrinho(produto);
    this.carrinhoService.addToCart(itemCarrinho);
    this.toast.success('Produto adicionado no carrinho!',
      {
        position: 'bottom-center',
      });
  }

  editarProduto(id: number) {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.getLojaDetail();
    this.isAdmin()
    this.isEmpreendedor();
    this.isConsumidor();
    this.showButtonEdit();
    this.empreendedorService.getEmpreendorIdByEmail(localStorage.getItem('email')!).subscribe((idEmpreendedor => {
      this.idEmpreendedor = idEmpreendedor
      console.log(this.idEmpreendedor)
    }))
  }
}
