import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  siteKey: string;
  hide = true;
  ocultar = true;
  isLoading = true;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService) {
    this.siteKey = '6LfZoeIgAAAAAL36fd8Z62_r1rUqdz1g4VSgxqDz';
  }
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(2)]],
    recaptcha: ['', Validators.required],
  });


  onSubmit() {

    const { email, password } = this.loginForm.value;
    localStorage.setItem('email', this.loginForm.value.email);

    this.authService.login(email, password).pipe(
      this.toast.observe({
        loading: 'Aguarde',

      })
    ).subscribe({
      next: (response) => {
        const token = response.headers.get('Authorization');
        this.authService.onLogin(token!.substring(7));
        this.router.navigate(['/']);
        window.location.reload();
        this.toast.success('Login efetuado com sucesso');
      },
      error: (err) => {
        switch(err.status){
          case 500:
            window.navigator?.vibrate?.(200);
            return this.toast.error('Email ou senha invalidos');
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

