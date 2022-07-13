import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { ConsumidorService } from 'src/app/core/services/consumidor/consumidor.service';
import { EmpreendedorService } from 'src/app/core/services/empreendedor/empreendedor.service';


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

  constructor(private fb: FormBuilder,
    private consumidorService: ConsumidorService,
    private empreendedorService: EmpreendedorService,
    private toast: HotToastService,
    private router: Router,
  ) { }

  consumidorForm = this.fb.group(
    {
      nome: [null, [Validators.required, Validators.minLength(10)]],
      cpf: [null, [Validators.required, Validators.maxLength(14)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      celular: [null, [Validators.maxLength(13)]],
      cep: [null],
      estado: [null],
      cidade: [null],
      bairro: [null],
      rua: [null],
      numero: [null],
    }
  );

  empreendedorForm = this.fb.group(
    {
      nomeNegocio: [null, [Validators.required]],
      cnpj: [null, [Validators.required, Validators.maxLength(25)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]], //trocar para minLength(8)
      celular: [null, Validators.maxLength(13)],
      ramo: [null, [Validators.required]],
      cep: [null, [Validators.maxLength(9)]],
      estado: [null],
      cidade: [null],
      bairro: [null],
      rua: [null],
      numero: [null]
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

  onSubmitConsumidor() {
    this.consumidorService.create(this.consumidorForm.value).subscribe({
      next: (response) => {
        this.toast.success('Cadastro consumidor efetuado com sucesso');
      },
      error: (error) => {
        this.toast.error('Algum erro inesperado aconteceu')
      }
    })
  }

  onSubmitEmpreendedor() {
    this.empreendedorService.create(this.empreendedorForm.value).subscribe({
      next: (response) => {
        this.toast.success('Cadastro empreendedor efetuado com sucesso');
      },
      error: (err) => {
        this.toast.error('Algum erro inesperado aconteceu')
      }
    })
  }

  ngOnInit(): void {
    console.log(this.empreendedorForm.value);
    console.log(this.consumidorForm.value);

  }
}
