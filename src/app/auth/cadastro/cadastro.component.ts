import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  siteKey: string;

  signupForm = this.fb.group(
    {
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      celular: ['', [Validators.required]],
    }
  );
  constructor(private fb: FormBuilder) { this.siteKey = '6Lf5nmQgAAAAAGBE82rwfwIllPqz90bkIuXEjzei';}

  ngOnInit(): void {
  }

  click1$?: boolean = true;
  classbotaoOne?: string = 'btn btn-con';
  classbotaoTwo?: string = 'btn btn-emp';

  onClick() {
    if (this.click1$ === true) {
      this.click1$ = false;
      this.classbotaoOne = 'btn btn-con';
    } else {
      this.click1$ = true;
      this.classbotaoOne = 'btn btn-con-troca';
    }

  }




  onSubmit() {
    return this.signupForm.value;
  }



}
