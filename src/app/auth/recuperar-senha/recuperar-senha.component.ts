import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent implements OnInit {
  siteKey: string;
  constructor(private fb: FormBuilder) {
    this.siteKey = '6LfZoeIgAAAAAL36fd8Z62_r1rUqdz1g4VSgxqDz';
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    recaptcha: ['', Validators.required]
  });

  ocultar = true;

  onSubmit() {
    alert('E-mail enviado com sucesso!')
  }

  ngOnInit(): void {
  }

}