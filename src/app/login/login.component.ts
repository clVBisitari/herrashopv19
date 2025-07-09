import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Route, RouterLink } from '@angular/router';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';  // Importing PasswordModule from PrimeNG
import { HttpClient } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router'; // Importing Router for navigation
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user.interface';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, PasswordModule, InputTextModule, ButtonModule],
  providers: [UserService],
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit, OnDestroy {

  private subscription!: Subscription;
  ngOnInit() {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.subscription = this.userService.loggedIn$.subscribe(value => {
      this.isLoggedIn = value;
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  constructor(private fb: FormBuilder, private http: HttpClient, private userService: UserService, public router: Router) {

    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  isLoggedIn: boolean = false; // Variable to track login status
  user: User | null = null;



  goToRegister() {
    this.router.navigate(['/register']);
  }

  formGroup: FormGroup;
  value3: string = '';

  onSubmit() {
    this.userService.login(this.formGroup.value.username, this.formGroup.value.password).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        this.user = response;
        this.isLoggedIn = true;
        this.subscription = this.userService.loggedIn$.subscribe(value => {
          this.isLoggedIn = value;
        });
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Login fallo:', error);
        alert('El Login falló. Por favor compruebe sus credenciales.');
      }
    });
  }

  logout() {
    this.userService.logout();
    this.isLoggedIn = false; // Update login status
    this.formGroup.reset(); // Reset the form
    this.router.navigate(['/']); // Redirect to home page
  }
}
