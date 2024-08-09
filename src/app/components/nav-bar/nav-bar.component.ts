import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { timer, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @ViewChild('container') containerRef!: ElementRef;
  @ViewChild('containerMobile') containerMobileRef!: ElementRef;
  currentRoute!: string;
  isSidebarOpen = false;

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {

  }

  animationBackgroundSideBar(): void {
    if (this.isSidebarOpen) {
      document.body.classList.add('sidebar-active');
    } else {
      document.body.classList.remove('sidebar-active');
    }
  }

  onMenuButtonClick(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.animationBackgroundSideBar();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const sidebar = document.getElementsByClassName('sidebar').item(0);

    if (sidebar && !this.elementRef.nativeElement.contains(event.target)) {
      // Animação do background do sidebar
      this.animationBackgroundSideBar();
      // Aplica a animação de fechar o sidebar
      sidebar.classList.add('slide-out');
      // Espera um milisegundo para setar que o sidebar foi fechado
      timer(100).pipe(take(1)).subscribe(() => this.isSidebarOpen = false);
    }
  }

  closeSideBar(event: string): void {
    if (event == 'close') {
      this.isSidebarOpen = false;
      this.animationBackgroundSideBar();
    }
  }

  isActive(route: string): string {
    this.animationBackgroundSideBar();
    return this.router.url.includes(route) ? 'active' : '';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
    this.snackbar.open('Desconectado com sucesso!', 'OK', {
      duration: 1500
    });
  }

}
