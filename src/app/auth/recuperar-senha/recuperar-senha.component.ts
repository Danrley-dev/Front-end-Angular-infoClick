import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastClose, HotToastService } from '@ngneat/hot-toast';
import { Pessoa } from 'src/app/core/models/pessoa';
import { PessoaService } from 'src/app/core/services/pessoa/pessoa.service';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent implements OnInit {
  emailUser?: string;
  siteKey: string;

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService,
    private toast: HotToastService,
    private router: Router
  ) {
    this.siteKey = '6LfZoeIgAAAAAL36fd8Z62_r1rUqdz1g4VSgxqDz';
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    recaptcha: ['', Validators.required]
  });

  ocultar = true;

  onSubmit() {

    const { email } = this.loginForm.value;
    localStorage.setItem('email', this.loginForm.value.email);

    this.pessoaService.findByEmail(email).subscribe({
      next: () => {
        this.toast.success('Email enviado com sucesso').afterClosed;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        switch (err.status) {
          case 500:
            window.navigator?.vibrate?.(200);
            return this.toast.error('Email não cadastrado');
          default:
            window.navigator?.vibrate?.(200);
            return this.toast.error(
              `Um erro aconteceu: ${err.error.message ?? 'Verifique sua conexão com a internet'}`
            );
        }
      },
    });
  }

  ngOnInit(): void {
  }

}

