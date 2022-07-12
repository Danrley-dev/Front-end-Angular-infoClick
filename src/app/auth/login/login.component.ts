import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators } from '@angular/forms';
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

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(2)]],
    recaptcha: ['', Validators.required],
  });

  onSubmit() {

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        const token = response.headers.get('Authorization');
        this.authService.onLogin(token!.substring(7));
        this.router.navigate(['/']);
        alert('login feito com sucesso')
      },
      error: (err) => {
        alert('email ou senha invalido')
      },
    });
  }

  constructor(private fb: FormBuilder,
              private authService: AuthService, 
              private router: Router) {
    this.siteKey = '6LfZoeIgAAAAAL36fd8Z62_r1rUqdz1g4VSgxqDz';
  }

  ngOnInit(): void {
  }

}

