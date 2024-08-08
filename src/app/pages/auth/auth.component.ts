import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @ViewChild('loginRef') loginRef!: ElementRef;
  @ViewChild('registerRef') registerRef!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  register(): void {
    this.loginRef.nativeElement.style.display = 'none';
    this.registerRef.nativeElement.style.display = 'flex';

    this.registerRef.nativeElement.classList.add('slide-in');
  }

  login(): void {
    this.registerRef.nativeElement.style.display = 'none';
    this.loginRef.nativeElement.style.display = 'flex';

    this.loginRef.nativeElement.classList.add('slide-in');
  }
}
