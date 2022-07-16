import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { API_CONFIG } from 'src/app/config/api.config';
import { Empreendedor } from 'src/app/core/models/empreendedor';
import { LojaService } from 'src/app/core/services/loja/loja.service';

@Component({
  selector: 'app-loja-create',
  templateUrl: './loja-create.component.html',
  styleUrls: ['./loja-create.component.scss']
})
export class LojaCreateComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private lojaService: LojaService,
    private toast: HotToastService,
    private router: Router,
    ) { }

    errorsI?: any;
    mudar: boolean = true;
    foto?: File;

    lojaForm = this.fb.group({
      nome: ['', [Validators.required,]],
      descricao: ['', [Validators.required]],
      cor: ['', [Validators.required]],
      
    });
        
    onSubmitloja() {
      this.lojaService.create(this.lojaForm.value).subscribe({
        next: () => {
          this.toast.success('Cadastro loja efetuado com sucesso');
          this.router.navigate([`loja-empreendedor`]);
        },
        error: (erro) => {
          switch(erro.status){
            case 400:
              window.navigator?.vibrate?.(200);
              for(const element of erro.error.errors) {
                this.errorsI =  this.toast.error(element.message);
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
