import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CreateUserDto } from 'src/app/interfaces/CreateUserDto';
import { LoginDto } from 'src/app/interfaces/LoginDto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @ViewChild('loginRef') loginRef!: ElementRef;
  @ViewChild('registerRef') registerRef!: ElementRef;
  @ViewChild('loginPassword') loginPasswordRef!: ElementRef;
  @ViewChild('registerPassword') registerPassword!: ElementRef;
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
    this.createRegisterForm();
  }

  createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      taxNumber: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  createRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      taxNumber: ['', [Validators.required]],
      mail: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  switchToRegister(): void {
    this.loginRef.nativeElement.style.display = 'none';
    this.registerRef.nativeElement.style.display = 'flex';

    this.registerRef.nativeElement.classList.add('slide-in');
  }

  switchToLogin(): void {
    this.registerRef.nativeElement.style.display = 'none';
    this.loginRef.nativeElement.style.display = 'flex';

    this.loginRef.nativeElement.classList.add('slide-in');
  }

  visibleLoginPassword(): void {
    const inputType = this.loginPasswordRef.nativeElement.getAttribute("type");
    this.loginPasswordRef.nativeElement.setAttribute("type", inputType === "password" ? "text" : "password");
  }

  visibleRegisterPassword(): void {
    const inputType = this.registerPassword.nativeElement.getAttribute("type");
    this.registerPassword.nativeElement.setAttribute("type", inputType === "password" ? "text" : "password");
  }

  login(): void {
    const user: LoginDto = {
      taxNumber: this.loginForm.value.taxNumber,
      password: this.loginForm.value.password
    }

    this.authService.login(user).subscribe((response) => {
      const { data, message } = response;

      localStorage.setItem('token', data.token);
      this.snackbar.open(message, 'OK', {
        duration: 2500
      });
      this.router.navigate(['/home']);
    },
    (err) => {
      const { message } = err.error;

      if (Array.isArray(message)) {
        this.snackbar.open(message[0], 'OK', {
          duration: 2500
        });
      } else {
        this.snackbar.open(message, 'OK', {
          duration: 2500
        });
      }
    });
  }

  register(): void {
    const newUser: CreateUserDto = {
      name: this.registerForm.value.name,
      taxNumber: this.registerForm.value.taxNumber,
      mail: this.registerForm.value.mail,
      phone: this.registerForm.value.phone,
      password: this.registerForm.value.password
    }

    this.authService.register(newUser).subscribe((response) => {
      const { message } = response;

      this.snackbar.open(message, 'OK', {
        duration: 2500
      });
      this.switchToLogin();
    },
    (err) => {
      const { message } = err.error;

      if (Array.isArray(message)) {
        this.snackbar.open(message[0], 'OK', {
          duration: 2500
        });
      } else {
        this.snackbar.open(message, 'OK', {
          duration: 2500
        });
      }
    });
  }

}