import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
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
  foto?: File;
  icon?: string = 'upload';
  errorsI?: any;
  mudar: boolean = true;

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
      nome: [null, [Validators.required]],
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
      next: () => {
        this.toast.success('Cadastro de consumidor efetuado com sucesso')
        this.router.navigate(['/login'])
          .then(() => {
            location.replace(location.href);
          });
      },
      error: (err) => {
        switch (err.status) {
          case 400:
            window.navigator?.vibrate?.(200);
            for (const element of err.error.errors) {
              this.errorsI = this.toast.error(element.message);
            }
            return this.errorsI;
          case 500:
            window.navigator?.vibrate?.(200);
            return this.toast.error(err.error.message)
          default:
            window.navigator?.vibrate?.(200);
            return this.toast.error(
              `Um erro aconteceu: ${err.error.message ?? 'Verifique sua conexão com a internet'}`)
        }
      }
    })
  }

  onSubmitEmpreendedor() {
    this.empreendedorService.create(this.empreendedorForm.value).subscribe({
      next: (response) => {
        this.toast.success('Cadastro empreendedor efetuado com sucesso');
        this.router.navigate(['loja-create']);
      },
      error: (erro) => {
        switch (erro.status) {
          case 400:
            window.navigator?.vibrate?.(200);
            for (const element of erro.error.errors) {
              this.errorsI = this.toast.error(element.message);
            }
            return this.errorsI;
          case 500:
            window.navigator?.vibrate?.(200);
            return this.toast.error(erro.error.message)
          default:
            window.navigator?.vibrate?.(200);
            return this.toast.error(
              `Um erro aconteceu: ${erro.error.message ?? 'Verifique sua conexão com a internet'}`)
        }
      }
    })
  }

  setImage(ev: any) {
    this.mudar = !this.mudar;
    this.foto = ev.target.files[0];

  }

  ngOnInit(): void {

  }
}
