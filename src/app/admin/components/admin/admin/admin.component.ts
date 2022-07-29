import { Consumidor } from 'src/app/core/models/pessoa';
import { Router, ActivatedRoute } from '@angular/router';
import { CarrinhoService } from './../../../../core/services/carrinho/carrinho.service';
import { Pessoa, Empreendedor } from './../../../../core/models/pessoa';
import { LojaService } from 'src/app/core/services/loja/loja.service';
import { ProdutoService } from 'src/app/core/services/produtos/produto.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Produto } from 'src/app/core/models/produto';
import { Loja } from 'src/app/core/models/loja';
import { PessoaService } from 'src/app/core/services/pessoa/pessoa.service';
import { ItemCarrinho } from 'src/app/core/models/item-carrinho';
import { NgbAlertModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsumidorService } from 'src/app/core/services/consumidor/consumidor.service';
import { EmpreendedorService } from 'src/app/core/services/empreendedor/empreendedor.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  produtos?: Produto[];
  produtoss?: Produto;
  lojas?: Loja[];
  consumidores?: Consumidor[];
  pessoas?: Pessoa[];
  empreendedor?: Empreendedor[];
  somar?: number;
  carrinho?: any;
  errorsI?: any;

  aba: string = 'home';
  deleteModalRef!: NgbModal;
  @ViewChild('deleteModal') deleteModal: any;
  @ViewChild('deleteModalEmpreendedor') deleteModalEmpreendedor: any;
  @ViewChild('deleteModalConsumidor') deleteModalConsumidor: any;

  deletaIdProduto?: Produto;
  deletaIdEmpreendedor?: Empreendedor;
  deletaIdConsumidor?: Consumidor;



  constructor(
    private authService: AuthService,
    private produtoService: ProdutoService,
    private lojaService: LojaService,
    private pessoaService: PessoaService,
    private carrinhoService: CarrinhoService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: NgbAlertModule,
    private modalService: NgbModal,
    private consumidoresService: ConsumidorService,
    private empreendedorService: EmpreendedorService,
    private toast: HotToastService
  ) { }



listaConsumidores(){
  this.consumidoresService.findAll().subscribe((response) => {
    this.consumidores = response;
  });
}

listaEmpreendedor() {
  this.empreendedorService.findAll().subscribe((response) => {
    this.empreendedor = response;
  }
  );
}


  listaProdutos() {
    this.produtoService.listaProdutos().subscribe((response) => {
      this.produtos = response;
    });
  }

  listaLojas() {
    this.lojaService.listaLojas().subscribe((response) => {
      this.lojas = response;
    });
  }

  listaPessoas() {
    this.pessoaService.findAllPessoas().subscribe((response) => {
      this.pessoas = response;
    });
  }

deletarProdutoModal(produto: Produto) {
  this.deletaIdProduto = produto;
  return this.modalService.open(this.deleteModal, { size: 'sm' });
}

deletarConsumidorModal(consumidor: Consumidor) {
  this.deletaIdConsumidor = consumidor;
  return this.modalService.open(this.deleteModalConsumidor, { size: 'sm' });
}

deletarEmpreendedorModal (empreendedor: Empreendedor) {
  this.deletaIdEmpreendedor = empreendedor;
  return this.modalService.open(this.deleteModalEmpreendedor, { size: 'sm' });
}

deletarLoja(id: number) {
  this.lojaService.delete(id).subscribe((response) => {
    this.listaLojas();
  }
  );
}

deletaCosumidor(id: number) {
  this.consumidoresService.delete(id).subscribe((response) => {
    this.listaConsumidores();
  }
  );
}

onRefresh() {
  this.listaProdutos();
  this.listaLojas();
  this.listaPessoas();
}


// deletes
confirmaDelete() {
  this.produtoService.delete(this.deletaIdProduto?.id!)
  .subscribe(
    {
      next: () => {
        this.listaProdutos();
        this.modalService.dismissAll();
        this.toast.success('Produto excluído!');
      },
    },
  );
}

confirmaDeleteEmpreendedor() {
  this.empreendedorService.delete(this.deletaIdEmpreendedor?.id!)
  .subscribe(
    {
      next: () => {
        this.listaEmpreendedor();
        this.modalService.dismissAll();
        this.toast.success('Empreendedor excluído!')
      },
      error: (err) => {
        switch (err.status) {
          case 400:
            window.navigator?.vibrate?.(200);
            for (const element of err.error.errors) {
              this.errorsI = this.toast.error(element.message);
            }
            return this.errorsI;
          case 500:
            window.navigator?.vibrate?.(200);
            return this.toast.error(err.error.message)
          default:
            window.navigator?.vibrate?.(200);
            return this.toast.error(
              `Um erro aconteceu: ${err.error.message ?? 'Verifique sua conexão com a internet'}`)
        }
      }
    },
  );
}

confirmaDeleteConsumidor() {
  this.consumidoresService.delete(this.deletaIdConsumidor?.id!)
  .subscribe(
    {
      next: () => {
        this.listaConsumidores();
        this.modalService.dismissAll();
        this.toast.success('Consumidor excluído!');
      }
    },
  );
}
// fim delete


editarUsuario(id: number) {
    this.router.navigate(['edit', id], { relativeTo: this.route });
}

// nao deleta produto
naoDeletar() {
  this.modalService.dismissAll();
}

editarProduto (id: number) {
    this.router.navigate(['edit', id], { relativeTo: this.route })
}


editarEmpreendedor(id: number) {
  this.router.navigate(['cadastro-edit', id], { relativeTo: this.route });
}

editarConsumidor(id: number) {
  this.router.navigate(['consumidor-edit', id], { relativeTo: this.route });
}





  ngOnInit(): void {
    this.listaProdutos();
    this.listaLojas();
    this.listaPessoas();
    this.listaEmpreendedor();
    this.listaConsumidores();


  }

}

