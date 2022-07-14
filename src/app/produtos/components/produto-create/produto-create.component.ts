import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.scss']
})
export class ProdutoCreateComponent implements OnInit {


  constructor(private fb: FormBuilder) { }

  cadastrarProduto = this.fb.group({
    name: ['', [Validators.required,]],
    produtoValor: ['', [Validators.required,]],
    produtoDescricao: ['', [Validators.required]],
    categoria: ['', [Validators.required]],
    produtoEstoque: ['', [Validators.required]],
    status: ['', [Validators.required]],
    produtoDesconto: ['', [Validators.required]],
    dataCriacao: ['', [Validators.required]],
    ultimaAtualizacao: ['', [Validators.required]],

  });

  ocultar = true;


  onSubmit() {
    alert('Cadastro realizado com sucesso!');
  }
  ngOnInit(): void {
  }

}
