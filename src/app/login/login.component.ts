import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Route, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';  // Importing PasswordModule from PrimeNG
import { HttpClient } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router'; // Importing Router for navigation

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, PasswordModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private http: HttpClient, public router: Router) {
    console.log('FormBuilder:', this.fb);
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  isLoggedIn: boolean = false; // Variable to track login status

  // goToRegister() {
  //   this.http.get('/api/register').subscribe({
  //     next: res => {
  //       console.log('✅ Redirigiendo a registro', res);
  //     },
  //     error: err => {
  //       console.error('❌ Error al redirigir a registro:', err);
  //       alert('Error del servidor al intentar redirigir a registro.');
  //     }
  //   });
  // }
  goToRegister() {
    this.router.navigate(['/register']);
  }

  formGroup: FormGroup;
  value3: string = ''; // Example variable for two-way binding  
  

  onSubmit() {
    this.http.post('/api/login', this.formGroup.value).subscribe({
      next: res => {
        console.log('✅ Login exitoso', res);
        localStorage.setItem('usuarioId', res.id);
        this.isLoggedIn = true; 
        location.reload(); 
      },
      error: err => {
        console.error('❌ Error al loguear:', err);
        alert('Error del servidor al intentar iniciar sesión.');
      }
    });
  }

}
