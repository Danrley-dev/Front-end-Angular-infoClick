import { Loja } from './loja';
import { Produto } from './produto';

export class ItemCarrinho {
  id?: number;
  name?: string;
  preco_unidade?: number;
  imagem?: string;
  quantidade: number;
  loja?: Loja['nomeLoja'];
  
  constructor(produto: Produto){
    this.id = produto.id;
    this.name = produto.name;
    this.preco_unidade = produto.produtoValor;
    this.imagem = produto.produtoImagem;
    this.quantidade = 1;
    this.loja = produto.loja!.nomeLoja;
  }

}
