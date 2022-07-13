export interface Consumidor {

    idConsumidor?: number;
    nome: string;
    cpf: string;
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

export enum Perfil {
    CONSUMIDOR
}