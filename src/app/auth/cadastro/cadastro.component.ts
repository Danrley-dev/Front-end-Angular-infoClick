import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})

export class CadastroComponent implements OnInit {

  ocultar = true;
  click$?: boolean = false;
  classbotaoOne?: string = 'btn btn-con';
  classbotaoTwo?: string = 'btn btn-emp';


  constructor(
    private fb: FormBuilder,
    private fbe: FormBuilder) { }


  consumidorForm = this.fb.group(
    {
      nome: ['', [Validators.required, Validators.minLength(10)]],
      cpf: ['', [Validators.required, Validators.maxLength(14)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      celular: ['', [Validators.required, Validators.maxLength(13)]],
      perfil: ['', [Validators.required]],
      cep: ['', [Validators.required, Validators.maxLength(9)]],
      estado: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      rua: ['', [Validators.required]],
      numero: ['', [Validators.required]],
    }
  );

  empreendedorForm = this.fbe.group(
    {
      nomeNegocio: ['', [Validators.required]],
      cnpj: ['', [Validators.required, Validators.maxLength(17)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      celular: ['', [Validators.required, Validators.maxLength(13)]],
      ramo: ['', [Validators.required]],
      perfil: ['', [Validators.required]],
      cep: ['', [Validators.required, Validators.maxLength(9)]],
      estado: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      rua: ['', [Validators.required]],
      numero: ['', [Validators.required]]
    }
  );


   onClick() {
    if (this.click$ === true) {
      this.click$ = false;
      this.classbotaoOne = 'btn btn-con';
      this.classbotaoTwo = 'btn btn-emp';
    } else {
      this.click$ = true;
      this.classbotaoOne = 'btn btn-con-troca';
      this.classbotaoTwo = 'btn btn-emp-troca';
    }
  }


  onSubmit(){
    if (this.consumidorForm) {
      console.log('Consumidor cadastrado com sucesso');
      return this.consumidorForm.value;
    }
    if (this.empreendedorForm){
      console.log('Empreendedor cadastrado com sucesso');
      return this.empreendedorForm.value;
    }
  }


  ngOnInit(): void {
    console.log(this.empreendedorForm.value);
    console.log(this.consumidorForm.value);

  }
}
