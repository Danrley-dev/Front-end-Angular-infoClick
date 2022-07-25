import { HotToastService } from '@ngneat/hot-toast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConsumidorService } from 'src/app/core/services/consumidor/consumidor.service';
import { EmpreendedorService } from 'src/app/core/services/empreendedor/empreendedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Consumidor } from 'src/app/core/models/pessoa';

@Component({
  selector: 'app-edit-consumidor',
  templateUrl: './edit-consumidor.component.html',
  styleUrls: ['./edit-consumidor.component.scss']
})
export class EditConsumidorComponent implements OnInit {
  ocultar = true;
  errorsI?: any;
  mudar: boolean = true;
  loading = true;
  id?: number;
  idConsumidor?: number;

  constructor( private fb: FormBuilder,
    private consumidorService: ConsumidorService,
    private empreendedorService: EmpreendedorService,
    private toast: HotToastService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute) { }

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

    onSubmitAdminConsumdir() {
      const CONSUMIDOR: Consumidor = {
        nome: this.consumidorForm.value.nome,
        cpf: this.consumidorForm.value.cpf,
        email: this.consumidorForm.value.email,
        password: this.consumidorForm.value.password,
        celular: this.consumidorForm.value.celular,
        cep: this.consumidorForm.value.cep,
        estado: this.consumidorForm.value.estado,
        cidade: this.consumidorForm.value.cidade,
        bairro: this.consumidorForm.value.bairro,
        rua: this.consumidorForm.value.rua,
        numero: this.consumidorForm.value.numero,
      };
      this.consumidorService.updateAdmin(this.id!, CONSUMIDOR).then(
        () => {
          this.toast.success('Consumidor editado com sucesso');
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

  ngOnInit(): void {

    this.route.params.subscribe((params: any) => {
      const id = params['id'];
      const consumidor$ = this.consumidorService.findById(id);
      consumidor$.subscribe((consumidor) => {
        this.id = id;
        this.consumidorForm.patchValue({
          nome: consumidor.nome,
          cpf: consumidor.cpf,
          email: consumidor.email,
          password: consumidor.password,
          celular: consumidor.celular,
          cep: consumidor.cep,
          estado: consumidor.estado,
          cidade: consumidor.cidade,
          bairro: consumidor.bairro,
          rua: consumidor.rua,
          numero: consumidor.numero,
        });
      });
    });


  }

}
