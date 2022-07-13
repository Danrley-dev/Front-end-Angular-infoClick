import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-loja-create',
  templateUrl: './loja-create.component.html',
  styleUrls: ['./loja-create.component.scss']
})
export class LojaCreateComponent implements OnInit {

  constructor(
    private fb: FormBuilder) { }

    lojaForm = this.fb.group({
      nome: ['', [Validators.required,]],
      descricao: ['', [Validators.required]],
      cnpj: ['', [Validators.required ]],
      data: ['', [Validators.required]]
    });
        
    onSubmit(){
      
    }

  ngOnInit(): void {
  }

}
