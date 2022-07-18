export interface Pessoa {
    id?: number;
    nome: string;
    email: string;
    password: string;
    perfil?: Perfil[] | string[];
    celular: string;
    cep?: string;
    estado?: string;
    cidade?: string;
    bairro?: string;
    rua?: string;
    numero?: string;
}

export interface Consumidor extends Pessoa {
    cpf: string;
}

export interface Empreendedor extends Pessoa {
    cnpj: string;
    ramo: Ramo;
}

export enum Perfil {
    ADMIN,
    EMPREENDEDOR,
    CONSUMIDOR
}

export enum Ramo{
    HARDWARE,
    SOFTWARE,
    AMBOS
}
