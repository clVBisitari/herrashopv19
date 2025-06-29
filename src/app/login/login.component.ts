import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';  // Importing PasswordModule from PrimeNG
import { HttpClient } from '@angular/common/http';  

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PasswordModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  formGroup: FormGroup;

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
