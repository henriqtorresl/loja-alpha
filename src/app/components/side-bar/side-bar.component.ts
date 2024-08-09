import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take, timer } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {

  @Output() closeEvent: EventEmitter<string> = new EventEmitter();
  @ViewChild('sidebar') sidebar!: ElementRef;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {

  }

  close(): void {
    // Aplica a animação de fechar o side bar:
    this.sidebar.nativeElement.classList.add('slide-out');

    // Espera um milisegundo para emitir o evento que destroi o componente
    timer(100).pipe(take(1)).subscribe(() => this.closeEvent.emit('close'));
  }

  isActive(route: string): string {
    return this.router.url.includes(route) ? 'active' : '';
  }

  alterTheme(): void {
    // Aplica a animação de fechar o side bar:
    this.sidebar.nativeElement.classList.add('slide-out');
    
    // Espera um milisegundo para emitir o evento que destroi o componente e chamar o método de alterar o tema
    timer(100).pipe(take(1)).subscribe(() => {
      this.closeEvent.emit('close');
    });
  }

  logout(): void {
    this.authService.logout();
    this.close();
    this.router.navigate(['/auth']);
    this.snackbar.open('Desconectado com sucesso!', 'OK', {
      duration: 1500
    });
  }

}