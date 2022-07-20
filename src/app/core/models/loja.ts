
import { Empreendedor, Pessoa } from "./pessoa";
import { Produto } from "./produto";

export class Loja {

  idLoja?: number;
  dataCriacao?: Date;
  corDeFundo?: string;
  nomeLoja?: string;
  descricaoLoja?: string;
  empreendedor?: Empreendedor;
  imagemLoja?: string;

  pessoa?: Pessoa;

  produtos?: Produto [];
  empreendedores?: Empreendedor[];

}
