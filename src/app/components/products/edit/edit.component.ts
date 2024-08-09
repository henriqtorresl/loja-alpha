import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/interfaces/Product';
import { UpdateProductDto } from 'src/app/interfaces/UpdateProductDto';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<HomeComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      name: [this.product.name, [Validators.required]],
      description: [this.product.description],
      price: [this.product.price, [Validators.required]],
      stock: [this.product.stock, [Validators.required]]
    });
  }

  sumNumber(formField: string): void {
    this.form.value[formField]++;
  }

  subtractionNumber(formField: string): void {
    if (this.form.value[formField] == 0) return;  // Para não permitir valores negativos
    this.form.value[formField]--;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  edit(): void {
    const productUpdated: UpdateProductDto = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock
    }

    this.productService.updateProduct(this.product.id, productUpdated).subscribe(() => {
      this.snackbar.open('Produto atualizado com sucesso!', 'OK', {
        duration: 2500
      });

      const productResponse: any = {
        id: this.product.id,
        name: this.form.value.name,
        description: this.form.value.description,
        price: this.form.value.price,
        stock: this.form.value.stock
      }

      this.dialogRef.close({ message: 'success', productUpdated: productResponse });
    },
    (err) => {
      this.snackbar.open('Não foi possível atualizar este produto!', 'OK', {
        duration: 2500
      });

      this.dialogRef.close({ message: 'error' });
    });
  }

}