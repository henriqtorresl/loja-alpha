import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewChecked {

  products: Product[] = [];
  loaded: boolean = false;
  @ViewChild('productsRef') productsRef!: ElementRef;

  scrollUpEnabled: boolean = false;
  scrollDownEnabled: boolean = false;

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  ngAfterViewChecked(): void {
    //Chamado após cada verificação da view do componente. Aplica-se apenas a componentes.
    //Adicione 'implementa AfterViewChecked' à classe.
    this.checkScrollButtons();

  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe((response) => {
      this.products = response;
      this.loaded = true;
    });
  }

  checkScrollButtons(): void {
    if (this.productsRef) {
      const container = this.productsRef.nativeElement;
      this.scrollUpEnabled = container.scrollTop > 0;
      this.scrollDownEnabled = container.scrollHeight > container.clientHeight + container.scrollTop;
    }
  }

  @HostListener('scroll', ['$event'])
  onDivScroll(event: Event): void {
    this.checkScrollButtons();
  }

  enableScrollUp(): string {
    return this.scrollUpEnabled ? '' : 'invisible-button';
  }

  enableScrollDown(): string {
    return this.scrollDownEnabled ? '' : 'invisible-button';
  }

  scroll(direction: 'up' | 'down'): void {
    if (this.productsRef) {
      const container = this.productsRef.nativeElement;
      container.scrollTop += (direction === 'up' ? -180 : 180);
    }
  }
}
