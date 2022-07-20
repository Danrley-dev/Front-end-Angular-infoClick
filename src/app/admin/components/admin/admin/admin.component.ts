import { CarrinhoService } from './../../../../core/services/carrinho/carrinho.service';
import { Pessoa, Empreendedor } from './../../../../core/models/pessoa';
import { LojaService } from 'src/app/core/services/loja/loja.service';
import { ProdutoService } from 'src/app/core/services/produtos/produto.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/core/models/produto';
import { Loja } from 'src/app/core/models/loja';
import { PessoaService } from 'src/app/core/services/pessoa/pessoa.service';
import { ItemCarrinho } from 'src/app/core/models/item-carrinho';

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



  constructor(
    private authService: AuthService,
    private produtoService: ProdutoService,
    private lojaService: LojaService,
    private pessoaService: PessoaService,
    private carrinhoService: CarrinhoService
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

deletarProduto(id: number) {


  this.produtoService.delete(id).subscribe((response) => {
    this.listaProdutos();
  });
}

deletarLoja(id: number) {

  this.lojaService.delete(id).subscribe((response) => {
    this.listaLojas();
  }
  );
}





  ngOnInit(): void {
    this.listaProdutos();
    this.listaLojas();
    this.listaPessoas();



  }
}
