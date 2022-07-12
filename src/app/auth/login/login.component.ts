import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  siteKey: string;
  hide = true;
  ocultar = true;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(8)]],
    recaptcha: ['', Validators.required],
  });

  onSubmit() {
    alert('E-mail enviado com sucesso!')
  }

  constructor(private fb: FormBuilder) {
    this.siteKey = '6LfZoeIgAAAAAL36fd8Z62_r1rUqdz1g4VSgxqDz';
  }

  ngOnInit(): void {
  }

}

