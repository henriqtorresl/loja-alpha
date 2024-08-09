import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      price: [0, [Validators.required]],
      stock: [0, [Validators.required]]
    });
  }

  sumNumber(formField: string): void {
    this.form.value[formField]++;
  }

  subtractionNumber(formField: string): void {
    if (this.form.value[formField] == 0) return;  // Para não permitir valores negativos
    this.form.value[formField]--;
  }

}
