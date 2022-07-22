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

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  produtos?: Produto[];
  lojas?: Loja[];
  pessoas?: Pessoa[];
  empreendedor?: Empreendedor[];
  somar?: number;
  carrinho?: any;

  aba: string = 'home';
  deleteModalRef!: NgbModal;
  @ViewChild('deleteModal') deleteModal: any;

  deletaIdProduto?: Produto;



  constructor(
    private authService: AuthService,
    private produtoService: ProdutoService,
    private lojaService: LojaService,
    private pessoaService: PessoaService,
    private carrinhoService: CarrinhoService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: NgbAlertModule,
    private modalService: NgbModal

  ) {}

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

deletarLoja(id: number) {
  this.lojaService.delete(id).subscribe((response) => {
    this.listaLojas();
  }
  );
}

onRefresh() {
  this.listaProdutos();
  this.listaLojas();
  this.listaPessoas();
}

confirmaDelete() {
  this.produtoService.delete(this.deletaIdProduto?.id!)
  .subscribe(
    {
      next: () => {
        this.listaProdutos();
        this.modalService.dismissAll();
      }
    },



  );
}

naoDeletar() {
  this.modalService.dismissAll();
}

editarProduto (id: number) {

    this.router.navigate(['edit', id], { relativeTo: this.route });


}


  ngOnInit(): void {
    this.listaProdutos();
    this.listaLojas();
    this.listaPessoas();



  }
}
