import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Loja } from 'src/app/core/models/loja';
import { EmpreendedorService } from 'src/app/core/services/empreendedor/empreendedor.service';
import { LojaService } from 'src/app/core/services/loja/loja.service';
import { UploadImgService } from 'src/app/core/services/uploadImg/upload-img.service';

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
    private empreendedorService: EmpreendedorService,
    private uploadService: UploadImgService
  ) { }

  carregando = false;

  urlImagem: any = "../../../../assets/img/logo-infoclick.png"
  idEmpreendedor?: number;
  errorsI?: any;
  mudar: boolean = true;
  foto?: File;
  idLoja?: Loja;

  lojaForm = this.fb.group({
    nomeLoja: [null, [Validators.required,]],
    descricaoLoja: [null, [Validators.required]],
    corDeFundo: [null, [Validators.required]],
    imagemLoja: [null],
  });

  onSubmitloja() {
    const LOJA: Loja = {
      nomeLoja: this.lojaForm.value.nomeLoja,
      descricaoLoja: this.lojaForm.value.descricaoLoja,
      corDeFundo: this.lojaForm.value.corDeFundo,
      imagemLoja: this.urlImagem,
    }

    this.lojaService.create(this.idEmpreendedor!, LOJA).then(() => {

      this.toast.success('Cadastro loja efetuado com sucesso');
      this.router.navigate([`loja-empreendedor/${this.idEmpreendedor}`]);
    },
      error => {
        switch (error.status) {
          case 400:
            window.navigator?.vibrate?.(200);
            for (const element of error.error.errors) {
              this.errorsI = this.toast.error(element.message);
            }
            return this.errorsI;
          case 500:
            window.navigator?.vibrate?.(200);
            return this.toast.error(error.error.message)
          default:
            window.navigator?.vibrate?.(200);
            return this.toast.error(
              `Um erro aconteceu: ${error.error.message ?? 'Verifique sua conexão com a internet'}`)
        }
      }
    )
  }

  setImage(event: any) {
    let arquivo = event.target.files[0]
    let reader = new FileReader()
    this.carregando = true;
    reader.readAsDataURL(arquivo)
    reader.onloadend = () => {
      this.uploadService.uploadFoto("lojaImg" + Date.now(), reader.result).then(urlImagem => {
        this.urlImagem = urlImagem;
        this.carregando = false;
        this.mudar = !this.mudar;
      })
    }
  }

  ngOnInit(): void {
    this.empreendedorService.getEmpreendorIdByEmail(localStorage.getItem('email')!).subscribe((idEmpreendedor => {
      this.idEmpreendedor = idEmpreendedor
    }))

    console.log(this.lojaForm);
  }
}
