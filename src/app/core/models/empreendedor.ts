export interface Empreendedor {

    idEmpreendedor?: number;
    nomeNegocio: string;
    cnpj: string;
    email: string;
    password: string;
    celular?: string;
    perfil?: Perfil[] | string[];
    ramo: Ramo;
    cep?: string;
    estado?: string;
    cidade?: string;
    bairro?: string;
    rua?: string;
    numero?: string;

}

export enum Perfil {
    EMPREENDEDOR
}

export enum Ramo{
    HARDWARE,
    SOFTWARE,
    AMBOS
}