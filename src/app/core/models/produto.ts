import { Loja } from "./loja";

export class Produto {

  id?: number;
  name!: string;
  produtoValor?: number;
  produtoDescricao?: string;
  categoria?: string;
  produtoEstoque?: number;
  status?: string;
  produtoImagem?: string;
  produtoDesconto?: number;
  dataCriacao?: Date;
  ultimaAtualizacao?: Date;
  loja?: Loja [] = [];
}
