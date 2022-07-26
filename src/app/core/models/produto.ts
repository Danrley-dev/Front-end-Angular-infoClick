import { Loja } from "./loja";

export class Produto {

  id?: number;
  name!: string;
  produtoValor?: number;
  produtoAntigoValor?: number;
  produtoDescricao?: string;
  categoria?: Categoria;
  produtoEstoque?: number;
  status?: Status;
  produtoImagem?: string;
  promocaoStatus?: Promocao;
  produtoDesconto?: number;
  dataLimitePromocao?: Date;
  dataCriacao?: Date;
  ultimaAtualizacao?: Date;
  loja?: Loja;
}

export enum Categoria {
  NADA,
  HARDWARE,
  SOFTWARE,
  AMBOS
}

export enum Status { 
  ATIVO,
  INATIVO
}

export enum Promocao {
  ATIVADA = "ativada",
  DESATIVADA = "desativada"
}