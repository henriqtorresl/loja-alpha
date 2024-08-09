import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { timer, take } from 'rxjs';

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
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.getCurrentRoute();
  }

  getCurrentRoute(): void{
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        this.disabledNavbar();
        console.log(this.currentRoute);
      }
    });
  }

  disabledNavbar(): void {
    if (this.currentRoute == '/auth') {
      this.containerRef.nativeElement.style.display = 'none';
      this.containerMobileRef.nativeElement.style.display = 'none';
    }
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

  // Fecha a sidebar se o clique for fora dela
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const sidebar = document.getElementsByClassName('sidebar').item(0)!;

    if (!this.elementRef.nativeElement.contains(event.target)) {
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

}
