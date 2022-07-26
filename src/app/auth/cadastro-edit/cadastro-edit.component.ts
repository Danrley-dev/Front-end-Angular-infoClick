import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Consumidor, Empreendedor } from 'src/app/core/models/pessoa';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ConsumidorService } from 'src/app/core/services/consumidor/consumidor.service';
import { EmpreendedorService } from 'src/app/core/services/empreendedor/empreendedor.service';

@Component({
  selector: 'app-cadastro-edit',
  templateUrl: './cadastro-edit.component.html',
  styleUrls: ['./cadastro-edit.component.scss'],
})
export class CadastroEditComponent implements OnInit {
  ocultar = true;
  errorsI?: any;
  mudar: boolean = true;
  loading = true;

  id?: number;

  idConsumidor?: number;
  idEmpreendedor?: number;

  userConsumidor!: boolean;
  userEmpreendedor!: boolean;
  userAdmin!: boolean;

  constructor(
    private fb: FormBuilder,
    private consumidorService: ConsumidorService,
    private empreendedorService: EmpreendedorService,
    private toast: HotToastService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  consumidorForm = this.fb.group({
    id: [this.idConsumidor],
    nome: [null],
    cpf: [null, Validators.maxLength(14)],
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.minLength(6)],
    celular: [null, [Validators.maxLength(13)]],
    cep: [null],
    estado: [null],
    cidade: [null],
    bairro: [null],
    rua: [null],
    numero: [null],
  });

  empreendedorForm = this.fb.group({
    id: [this.idEmpreendedor],
    nome: [null],
    cnpj: [null, Validators.maxLength(25)],
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.minLength(6)], //trocar para minLength(8)
    celular: [null, Validators.maxLength(13)],
    ramo: [null],
    cep: [null, [Validators.maxLength(9)]],
    estado: [null],
    cidade: [null],
    bairro: [null],
    rua: [null],
    numero: [null],
  });

  isConsumidor() {
    const containsConsumidor = this.authService.userInfo().subscribe((res) => {
      const perfilsBolean = Object.keys(res.perfil!).map(function (key: any) {
        if (res.perfil![key] == 'CONSUMIDOR') {
          return true;
        }
        return false;
      });
      this.userConsumidor = perfilsBolean.includes(true);
      console.log(this.userConsumidor);
    });
  }

  isEmpreendedor() {
    const containsEmprendedor = this.authService.userInfo().subscribe((res) => {
      const perfilsBolean = Object.keys(res.perfil!).map(function (key: any) {
        if (res.perfil![key] == 'ADMIN') {
          return true;
        }
        return false;
      });
      this.userEmpreendedor = perfilsBolean.includes(true);
    });
  }

  idAdmin() {
    const containsAdmin = this.authService.userInfo().subscribe((res) => {
      const perfilsBolean = Object.keys(res.perfil!).map(function (key: any) {
        if (res.perfil![key] == 'ADMIN') {
          return true;
        }
        return false;
      });
      this.userAdmin = perfilsBolean.includes(true);
    });
  }

  onSubmitConsumidor() {
    const consumidor: Consumidor = {
      ...this.consumidorForm.value,
    };
    const ref = this.toast.loading('Atualizando seus dados...');

    this.consumidorService.update(this.idConsumidor!, consumidor).subscribe({
      next: () => {
        ref.close();
        this.toast.success('Dados atualizado com sucesso!');
        this.router.navigate(['']);
      },
      error: (err) => {
        ref.close();
        switch (err.status) {
          case 400:
            window.navigator?.vibrate?.(200);
            for (const element of err.error.errors) {
              this.errorsI = this.toast.error(element.message);
            }
            return this.errorsI;
          case 500:
            window.navigator?.vibrate?.(200);
            return this.toast.error(err.error.message);
          default:
            window.navigator?.vibrate?.(200);
            return this.toast.error(
              `Um erro aconteceu: ${
                err.error.message ?? 'Verifique sua conexão com a internet'
              }`
            );
        }
      },
    });
  }

  onSubmitAdminEmpreendedor() {
    const EMPREENDEDOR: Empreendedor = {
      nome: this.empreendedorForm.value.nome,
      cnpj: this.empreendedorForm.value.cnpj,
      email: this.empreendedorForm.value.email,
      password: this.empreendedorForm.value.password,
      celular: this.empreendedorForm.value.celular,
      ramo: this.empreendedorForm.value.ramo,
      cep: this.empreendedorForm.value.cep,
      estado: this.empreendedorForm.value.estado,
      cidade: this.empreendedorForm.value.cidade,
      bairro: this.empreendedorForm.value.bairro,
      rua: this.empreendedorForm.value.rua,
      numero: this.empreendedorForm.value.numero,
    };
    this.empreendedorService.updateAdmin(this.id!, EMPREENDEDOR).then(
      () => {
        this.toast.success('Empreendedor editado com sucesso');
        this.router.navigate(['/admin']);
      },
      (error) => {
        switch (error.status) {
          case 400:
            window.navigator?.vibrate?.(200);
            for (const element of error.error.errors) {
              this.errorsI = this.toast.error(element.message);
            }
            return this.errorsI;
          case 500:
            window.navigator?.vibrate?.(200);
            return this.toast.error(error.error.message);
          default:
            window.navigator?.vibrate?.(200);
            return this.toast.error(
              `Um erro aconteceu: ${
                error.error.message ?? 'Verifique sua conexão com a internet'
              }`
            );
        }
      }
    );
  }


  onSubmitEmpreendedor() {
    const empreendedor: Empreendedor = {
      ...this.empreendedorForm.value,
    };
    const ref = this.toast.loading('Atualizando seus dados...');

    this.empreendedorService
      .update(this.idEmpreendedor!, empreendedor)
      .subscribe({
        next: () => {
          ref.close();
          this.toast.success('Dados atualizado com sucesso!');
          this.router.navigate(['']);
        },
        error: (err) => {
          ref.close();
          switch (err.status) {
            case 400:
              window.navigator?.vibrate?.(200);
              for (const element of err.error.errors) {
                this.errorsI = this.toast.error(element.message);
              }
              return this.errorsI;
            case 500:
              window.navigator?.vibrate?.(200);
              return this.toast.error(err.error.message);
            default:
              window.navigator?.vibrate?.(200);
              return this.toast.error(
                `Um erro aconteceu: ${
                  err.error.message ?? 'Verifique sua conexão com a internet'
                }`
              );
          }
        },
      });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      const id = params['id'];
      const empreendedor$ = this.empreendedorService.findById(id);
      empreendedor$.subscribe((empreendedor) => {
        this.id = id;
        this.empreendedorForm.patchValue({
          nome: empreendedor.nome,
          cnpj: empreendedor.cnpj,
          email: empreendedor.email,
          password: empreendedor.password,
          celular: empreendedor.celular,
          ramo: empreendedor.ramo,
          cep: empreendedor.cep,
          estado: empreendedor.estado,
          cidade: empreendedor.cidade,
          bairro: empreendedor.bairro,
          rua: empreendedor.rua,
          numero: empreendedor.numero,
        });
      });
    });

    this.empreendedorService
      .getEmpreendorIdByEmail(localStorage.getItem('email')!)
      .subscribe((idEmpreendedor) => {
        this.idEmpreendedor = idEmpreendedor;
        this.empreendedorService.findById(this.idEmpreendedor).subscribe({
          next: (empreendedor) => {
            empreendedor.password = '';
            this.empreendedorForm.patchValue(empreendedor);
            this.loading = false;
          },
          error: (err) => {
            this.loading = false;
          },
        });
      });

    this.consumidorService
      .getConsumidorIdByEmail(localStorage.getItem('email')!)
      .subscribe((idConsumidor) => {
        this.idConsumidor = idConsumidor;
        this.consumidorService.findById(this.idConsumidor).subscribe({
          next: (consumidor) => {
            consumidor.password = '';
            this.consumidorForm.patchValue(consumidor);
            this.loading = false;
          },
          error: (err) => {
            this.loading = false;
          },
        });
      });

    this.isConsumidor();
    this.isEmpreendedor();
    this.idAdmin();
  }
}
