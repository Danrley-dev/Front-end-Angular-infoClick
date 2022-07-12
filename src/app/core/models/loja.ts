import { Produto } from "./produto";

export class Loja {

  idLoja?: number;
  dataCriacao?: Date;
  corDefundo?: string;
  nomeLoja?: string;
  descricaoLoja?: string;
  empreendedor?: string;

  produtos?: Produto [];
}
