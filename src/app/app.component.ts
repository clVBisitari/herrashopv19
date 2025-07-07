import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from "./login/login.component";
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./footer/footer.component";
import { RegisterComponent } from "./register/register.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule,
    ButtonModule,
    DialogModule, CommonModule, LoginComponent, RegisterComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'herrashop19';
}
