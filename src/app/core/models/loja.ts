import { Empreendedor } from "./empreendedor";
import { Produto } from "./produto";

export class Loja {

  idLoja?: number;
  dataCriacao?: Date;
  corDefundo?: string;
  nomeLoja?: string;
  descricaoLoja?: string;
  empreendedor?: Empreendedor;
  imagemLoja?: string;

  produtos?: Produto [];
}
