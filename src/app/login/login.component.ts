import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';  // Importing PasswordModule from PrimeNG
import { HttpClient } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, PasswordModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  goToRegister() {
    this.http.get('/api/register').subscribe({
      next: res => {
        console.log('✅ Redirigiendo a registro', res);
      },
      error: err => {
        console.error('❌ Error al redirigir a registro:', err);
        alert('Error del servidor al intentar redirigir a registro.');
      }
    });
}
  formGroup: FormGroup;
  value3: string = ''; // Example variable for two-way binding  
  constructor(private fb: FormBuilder, private http: HttpClient) {
    console.log('FormBuilder:', this.fb);
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.http.post('/api/login', this.formGroup.value).subscribe({
      next: res => {
        console.log('✅ Login exitoso', res);
      },
      error: err => {
        console.error('❌ Error al loguear:', err);
        alert('Error del servidor al intentar iniciar sesión.');
      }
    });
  }

}
