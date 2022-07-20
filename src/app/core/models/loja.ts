
import { Empreendedor } from "./pessoa";
import { Produto } from "./produto";

export class Loja {

  idLoja?: number;
  dataCriacao?: Date;
  corDeFundo?: string;
  nomeLoja?: string;
  descricaoLoja?: string;
  empreendedor?: Empreendedor;
  imagemLoja?: string;

  produtos?: Produto [];
}
