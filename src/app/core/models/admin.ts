export interface Admin {

    idAdmin?: number;
    nome: string;
    email: string;
    password: string;
    perfil?: Perfil[] | string[];
}

export enum Perfil {
    ADMIN
}