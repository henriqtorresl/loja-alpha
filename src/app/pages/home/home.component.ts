import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { DeleteComponent } from 'src/app/components/products/delete/delete.component';
import { EditComponent } from 'src/app/components/products/edit/edit.component';
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
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  ngAfterViewChecked(): void {
    //Chamado após cada verificação da view do componente. Aplica-se apenas a componentes.
    //Adicione 'implementa AfterViewChecked' à classe.
    this.checkScrollButtons();
    this.cdr.detectChanges();  // para garantir que as mudanças vão ser detectadas.
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
      container.scrollTop += (direction === 'up' ? -180 : 180);   // desloca 180px pra cima ou 180px pra baixo, o tamanho dos cards é de 150px mais 20px de padding e 10px de margin
    }
  }

  openEditProduct(product: Product): void {
    const dialogRef = this.dialogRef.open(EditComponent, {
      data: product
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe((response) => {      
      const { message, productUpdated } = response;
      
      if (message == 'success') {
        this.products[this.products.indexOf(product)] = productUpdated;
      }
    });
  }

  openDeleteProduct(product: Product): void {
    const dialogRef = this.dialogRef.open(DeleteComponent, {
      data: product
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe((response) => {
      const { message } = response;
      
      if (message == 'sucess') {
        this.products = this.products.filter(p => p.id !== product.id);
      }
    });
  }

}
