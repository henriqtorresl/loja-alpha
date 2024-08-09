import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateProductDto } from 'src/app/interfaces/CreateProductDto';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      name: [''],
      description: [''],
      price: [0],
      stock: [0]
    });
  }

  sumNumber(formField: string): void {
    this.form.value[formField]++;
  }

  subtractionNumber(formField: string): void {
    if (this.form.value[formField] == 0) return;  // Para não permitir valores negativos
    this.form.value[formField]--;
  }

  newProduct(): void {
    const newProduct: CreateProductDto = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock
    }

    this.productService.createProduct(newProduct).subscribe((response) => {
      const { message } = response;

      this.snackbar.open(message, 'OK', {
        duration: 2500
      });

      this.form.patchValue({
        name: '',
        description: '',
        price: 0,
        stock: 0
      });

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
