import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../../app/interfaces/user.interface';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [Toast, Ripple, DividerModule, ButtonModule, InputTextModule, ReactiveFormsModule],
  providers: [MessageService, UserService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private messageService: MessageService, private userService: UserService, public router: Router) {

    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      pais: ['', Validators.required],
      codigo_postal: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', Validators.required]
    });
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  goToRegister(): Observable<User> | any 
  {
    if (this.registerForm.invalid) return;

    const { nombre, email, telefono, direccion, ciudad, pais, codigo_postal, password, password2 } = this.registerForm.value;

    if (password !== password2)   
    {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Consultamos si el email ya está registrado
    this.http.get<{ exists: boolean }>(`${environment.api_url}/usuarios/check-email?email=${email}`).subscribe({
      next: (res) => 
        {
        if (res.exists) 
        {
          alert('El email ya está registrado. Por favor, usá otro.');
          return;
        }

        // Si no existe, seguimos con el registro
        const nuevoUser = 
        {
          nombre,
          email,
          telefono,
          direccion,
          ciudad,
          pais,
          codigo_postal,
          password,
          rol: 'user'
        };

        this.http.post<User>(`${environment.api_url}/crearusuario`, nuevoUser).subscribe({
          next: (res) => 
          {
            alert('Usuario registrado exitosamente');
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Usuario registrado exitosamente!' });
            this.registerForm.reset();
            this.router.navigate(['/home']);
          },
          error: (err) => 
          {
            console.error(err);
            alert('Error al registrar usuario');
          }
        });
      },
      error: (err) => 
      {
        console.error('Error al verificar email:', err);
        alert('Error al verificar el email');
      }
  });
}


  login() {
    const {email, pass} = this.loginForm.value;
    console.log('Usuario:', email);
    console.log('password:', pass);

    if (!email || !pass) {
      alert('Por favor, completa todos los campos');
      return;
    }

    if (this.loginForm.invalid) return;

    this.userService.login(email, pass).subscribe({
      next: (res) => {
        alert('Inicio de sesión exitoso');
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Inicio de sesión exitoso!' });
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al iniciar sesión');
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al iniciar sesión' });
      }
    });
  }

}
