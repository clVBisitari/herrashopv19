import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [Toast, Ripple, DividerModule, ButtonModule, InputTextModule, ReactiveFormsModule],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private messageService: MessageService, public router: Router) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password2: ['', Validators.required]
    });
  }


  goToRegister() {
    if (this.registerForm.invalid) return;

    const { nombre, email, password, password2 } = this.registerForm.value;
    if (password !== password2) {
      alert('Las contraseñas no coinciden');
      return;
    }
    this.http.post('http://localhost:3000/api/crearusuario', {
      nombre,
      email,
      password
    }).subscribe({
      next: (res) => {
        alert('Usuario registrado exitosamente');
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Usuario registrado exitosamente!' });
        this.registerForm.reset();
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar usuario');
      }
    });
     this.router.navigate(['/home']);
  }

  login() {
    // Aquí podrías redirigir a una página de inicio de sesión o realizar alguna acción adicional
    alert('Redirigiendo a la página de inicio de sesión...');
    // Por ejemplo, podrías redirigir a una ruta de inicio de sesión:
    // this.router.navigate(['/login']);
  }

}
