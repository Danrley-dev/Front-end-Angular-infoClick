import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { LojaService } from 'src/app/core/services/loja/loja.service';
import { ProdutoService } from 'src/app/core/services/produtos/produto.service';


@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.scss']
})
export class ProdutoCreateComponent implements OnInit {

  idLoja?: number;
  imagem?: File;
  icon?: string = 'upload';
  errorsI?: any;
  mudar: boolean = true;


  constructor(
    private fb: FormBuilder,
    private lojaService: LojaService,
    private toast: HotToastService,
    private router: Router,
    private produtoService: ProdutoService,
    ) { }

  cadastrarProduto = this.fb.group({
    name: ['', [Validators.required,]],
    produtoDescricao: ['', [Validators.required]],
    categoria: ['', [Validators.required]],
    produtoEstoque: ['', [Validators.required]],
    status: ['', [Validators.required]],
    produtoValor: ['', [Validators.required,]],
    produtoDesconto: ['', [Validators.required]],

  });

  setImage(ev: any) {
    this.mudar = !this.mudar;
    this.imagem = ev.target.files[0];
  }

  onSubmit() {
    this.produtoService.create(this.idLoja!, this.cadastrarProduto.value).subscribe({
      next: (response) => {
        this.toast.success('Produto cadastrado com sucesso');
        this.router.navigate(['/loja-empreendedor/{{idLoja}}']);
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

  ngOnInit(): void {
    this.lojaService.findLojaById(localStorage.getItem('email')!).subscribe((idLoja => {
      this.idLoja=idLoja
    }))
  }
}
