import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
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

  carregando = false;

  idLoja?: number;
  imagem?: File;
  icon?: string = 'upload';
  errorsI?: any;
  mudar: boolean = true;
  urlImagem: any = "../../../../assets/img/logo-infoclick.png";
  produtoAtivo = false;

  constructor(
    private fb: FormBuilder,
    private lojaService: LojaService,
    private toast: HotToastService,
    private router: Router,
    private produtoService: ProdutoService,
    private uploadService: UploadImgService
    ) { }

    click(){
      this.produtoAtivo = !this.produtoAtivo
    }
    

  cadastrarProduto = this.fb.group({
    name: ['', [Validators.required,]],
    produtoDescricao: ['', [Validators.required]],
    categoria: ['', [Validators.required]],
    produtoEstoque: ['', [Validators.required]],
    status: ['', [Validators.required]],
    promocaoStatus: [null],
    produtoValor: ['', [Validators.required,]],
    produtoDesconto: [null],
    dataLimitePromocao: [null],
    produtoImagem: [null]
  });

  onSubmit() {
    const PRODUTO: Produto ={
      name: this.cadastrarProduto.value.name,
      produtoDescricao: this.cadastrarProduto.value.produtoDescricao,
      categoria: this.cadastrarProduto.value.categoria,
      produtoEstoque: this.cadastrarProduto.value.produtoEstoque,
      status: this.cadastrarProduto.value.status,
      promocaoStatus: this.cadastrarProduto.value.promocaoStatus,
      produtoValor: this.cadastrarProduto.value.produtoValor,
      produtoDesconto: this.cadastrarProduto.value.produtoDesconto,
      dataLimitePromocao: this.cadastrarProduto.value.dataLimitePromocao,
      produtoImagem: this.urlImagem,
    }
    this.produtoService.create(this.idLoja!,PRODUTO).then(() =>{
        this.toast.success('Produto cadastrado com sucesso');
        this.router.navigate([`/loja-empreendedor/${this.idLoja}`]);
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
    this.carregando = true;

    reader.readAsDataURL(arquivo)
    reader.onloadend = () => {
      console.log(reader.result)
      this.uploadService.uploadFoto("produtoImg" + Date.now(), reader.result).then(urlImagem => {
        this.carregando = false;
        this.mudar = !this.mudar;
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
