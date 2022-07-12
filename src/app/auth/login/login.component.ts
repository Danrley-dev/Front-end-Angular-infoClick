import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public theme: 'light' | 'dark' = 'light';
  public size: 'compact' | 'normal' = 'normal';
  public lang = 'pt';
  public type: 'image' | 'audio' = 'image';
  public siteKey: string = '6Lf5nmQgAAAAAGBE82rwfwIllPqz90bkIuXEjzei';

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  senha = new FormControl('', [Validators.required,]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessageSenha() {
    if (this.senha.hasError('required')) {
      return 'You must enter a value';
    }

    return this.senha.hasError('senha') ? 'Not a valid senha' : '';
  }






  constructor(private fb: FormBuilder) {
  }





  ngOnInit(): void {
  }

}

