import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Produto } from 'src/app/core/models/produto';
import { LojaService } from 'src/app/core/services/loja/loja.service';
import { ProdutoService } from 'src/app/core/services/produtos/produto.service';
import { UploadImgService } from 'src/app/core/services/uploadImg/upload-img.service';


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
  urlImagem: any = ""

  constructor(
    private fb: FormBuilder,
    private lojaService: LojaService,
    private toast: HotToastService,
    private router: Router,
    private produtoService: ProdutoService,
    private uploadService: UploadImgService
  ) { }


  cadastrarProduto = this.fb.group({
    name: ['', [Validators.required,]],
    produtoDescricao: ['', [Validators.required]],
    categoria: ['', [Validators.required]],
    produtoEstoque: ['', [Validators.required]],
    status: ['', [Validators.required]],
    produtoValor: ['', [Validators.required,]],
    produtoDesconto: ['', [Validators.required]],
    produtoImagem: [null]
  });

  onSubmit() {
    const PRODUTO: Produto ={
      name: this.cadastrarProduto.value.name,
      produtoDescricao: this.cadastrarProduto.value.produtoDescricao,
      categoria: this.cadastrarProduto.value.categoria,
      produtoEstoque: this.cadastrarProduto.value.produtoEstoque,
      status: this.cadastrarProduto.value.status,
      produtoValor: this.cadastrarProduto.value.produtoValor,
      produtoDesconto: this.cadastrarProduto.value.produtoDesconto,
      produtoImagem: this.urlImagem,
    }
    this.produtoService.create(this.idLoja!,PRODUTO).then(() =>{
        this.toast.success('Produto cadastrado com sucesso');
        this.router.navigate(['/loja-empreendedor/{{idLoja}}']);
      },
      error => {
        switch(error.status){
          case 400:
            window.navigator?.vibrate?.(200);
            for(const element of error.error.errors) {
              this.errorsI =  this.toast.error(element.message);
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
    )}

  setImage(event: any) {
    let arquivo = event.target.files[0]
    let reader = new FileReader()

    reader.readAsDataURL(arquivo)
    reader.onloadend = () => {
      console.log(reader.result)
      this.uploadService.uploadFoto("produtoImg" + Date.now(), reader.result).then(urlImagem => {
        this.urlImagem = urlImagem
      })
  }
}

  ngOnInit(): void {
    this.lojaService.findLojaById(localStorage.getItem('email')!).subscribe((idLoja => {
      this.idLoja=idLoja
    }))
  }
}
