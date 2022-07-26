import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Loja } from 'src/app/core/models/loja';
import { EmpreendedorService } from 'src/app/core/services/empreendedor/empreendedor.service';
import { LojaService } from 'src/app/core/services/loja/loja.service';
import { UploadImgService } from 'src/app/core/services/uploadImg/upload-img.service';

@Component({
  selector: 'app-loja-edit',
  templateUrl: './loja-edit.component.html',
  styleUrls: ['./loja-edit.component.scss']
})
export class LojaEditComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private lojaService: LojaService,
    private toast: HotToastService,
    private router: Router,
    private route: ActivatedRoute,
    private empreendedorService: EmpreendedorService,
    private uploadService: UploadImgService) { }

  carregando = false;

  urlImagem: any = ""
  idEmpreendedor?: number;
  errorsI?: any;
  mudar: boolean = true;
  foto?: File;
  id?: number;

  lojaForm = this.fb.group({
    nomeLoja: [''],
    descricaoLoja: [''],
    corDeFundo: [''],
    imagemLoja: [''],
  });

  onSubmitloja() {
    const LOJA: Loja = {
      nomeLoja: this.lojaForm.value.nomeLoja,
      descricaoLoja: this.lojaForm.value.descricaoLoja,
      corDeFundo: this.lojaForm.value.corDeFundo,
      imagemLoja: this.urlImagem,
    }
    this.lojaService.update(this.idEmpreendedor!, LOJA).subscribe({
      next: () => {
        this.toast.success('Loja editada com sucesso');
        this.router.navigate([`loja-empreendedor/${this.idEmpreendedor}`]);
        window.location.reload();
      },
    });
  }

  setImage(event: any) {
    let arquivo = event.target.files[0]
    let reader = new FileReader()
    this.carregando = true;
    reader.readAsDataURL(arquivo)
    reader.onloadend = () => {
      console.log(reader.result)
      this.uploadService.uploadFoto("lojaImg" + Date.now(), reader.result).then(urlImagem => {
        this.urlImagem = urlImagem
        this.carregando = false;
        this.mudar = !this.mudar;
      })
    }

  }

  ngOnInit(): void {
    this.empreendedorService.getEmpreendorIdByEmail(localStorage.getItem('email')!).subscribe((idEmpreendedor => {
      this.idEmpreendedor = idEmpreendedor
      this.route.params.subscribe((params: any) => {
        const loja$ = this.lojaService.getLojaId(this.idEmpreendedor!);
        loja$.subscribe(loja => {
          this.id = this.idEmpreendedor!;
          this.lojaForm.patchValue({
            nomeLoja: loja.nomeLoja,
            descricaoLoja: loja.descricaoLoja,
            corDeFundo: loja.corDeFundo,
            imagemLoja: loja.imagemLoja,
          });
        });
      });
    }));
  }

}