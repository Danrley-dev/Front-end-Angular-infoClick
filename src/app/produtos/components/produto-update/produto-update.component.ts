import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Produto } from 'src/app/core/models/produto';
import { ProdutoService } from 'src/app/core/services/produtos/produto.service';
import { UploadImgService } from 'src/app/core/services/uploadImg/upload-img.service';


@Component({
  selector: 'app-produto-update',
  templateUrl: './produto-update.component.html',
  styleUrls: ['./produto-update.component.scss']
})
export class ProdutoUpdateComponent implements OnInit {
  constructor(public dialog: MatDialog,
    private fb: FormBuilder,
    private toast: HotToastService,
    private router: Router,
    private produtoService: ProdutoService,
    private uploadService: UploadImgService,
    private route: ActivatedRoute) { }

  carregando = false;

  urlImagem: any = ""
  id?: number;
  errorsI?: any;
  mudar: boolean = true;
  foto?: File;

  produtoForm = this.fb.group({
    name: ['', [Validators.required,]],
    produtoDescricao: ['', [Validators.required]],
    categoria: ['', [Validators.required]],
    produtoEstoque: ['', [Validators.required]],
    status: ['', [Validators.required]],
    promocaoStatus: [null],
    produtoValor: ['', [Validators.required,]],
    produtoDesconto: ['', [Validators.required]],
    dataLimitePromocao: [null],
    produtoImagem: [null]
  });

  onSubmit() {
    const PRODUTO: Produto = {
      name: this.produtoForm.value.name,
      produtoDescricao: this.produtoForm.value.produtoDescricao,
      categoria: this.produtoForm.value.categoria,
      produtoEstoque: this.produtoForm.value.produtoEstoque,
      status: this.produtoForm.value.status,
      promocaoStatus: this.produtoForm.value.promocaoStatus,
      produtoValor: this.produtoForm.value.produtoValor,
      produtoDesconto: this.produtoForm.value.produtoDesconto,
      dataLimitePromocao: this.produtoForm.value.dataLimitePromocao,
      produtoImagem: this.urlImagem,
    }
    this.produtoService.update(this.id!, PRODUTO).then(() => {
      this.toast.success('Produto editado com sucesso');
      this.router.navigate([`/produto-detail/${this.id}`]);
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
      console.log(reader.result)
      this.uploadService.uploadFoto("produtoImg" + Date.now(), reader.result).then(urlImagem => {
        this.carregando = false;
        this.mudar = !this.mudar;
        this.urlImagem = urlImagem
      })
    }
  }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: any) => {
        const id = params['id'];
        const produto$ = this.produtoService.getById(id);
        produto$.subscribe(produto => {
          this.id = id;
          this.produtoForm.patchValue({
            name: produto.name,
            produtoDescricao: produto.produtoDescricao,
            categoria: produto.categoria,
            produtoEstoque: produto.produtoEstoque,
            status: produto.status,
            promocaoStatus: produto.promocaoStatus,
            produtoValor: produto.produtoValor,
            produtoDesconto: produto.produtoDesconto,
            dataLimitePromocao: produto.dataLimitePromocao,
            produtoImagem: produto.produtoImagem
          })
        }
        )
      }
    );
  }
}
