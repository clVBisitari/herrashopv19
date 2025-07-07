import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [DividerModule, ButtonModule, InputTextModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor() { }
  goToRegister() {
    // Aquí podrías redirigir a una página de registro o realizar alguna acción adicional
    alert('Redirigiendo a la página de registro...');
    // Por ejemplo, podrías redirigir a una ruta de registro:
    // this.router.navigate(['/register']);
  }
  login() {
    // Aquí podrías redirigir a una página de inicio de sesión o realizar alguna acción adicional
    alert('Redirigiendo a la página de inicio de sesión...');
    // Por ejemplo, podrías redirigir a una ruta de inicio de sesión:
    // this.router.navigate(['/login']);
  }
}
