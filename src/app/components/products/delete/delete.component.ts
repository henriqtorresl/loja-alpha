import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/interfaces/Product';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<HomeComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private productService: ProductService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {

  }

  cancel(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.productService.deleteProduct(this.product.id).subscribe(() => {
      this.snackbar.open('Produto excluído com sucesso!', 'OK', {
        duration: 2500
      });

      this.dialogRef.close({ message: 'sucess', id: this.product.id });
    },
    () => {
      this.snackbar.open('Não foi possível excluir!', 'OK', {
        duration: 2500
      });

      this.dialogRef.close({ message: 'error' });    });
  }

}
