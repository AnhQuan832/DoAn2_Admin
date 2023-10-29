import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service'
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductManagement } from '../product-management/product-management.component';

@Component({
  selector: 'app-charts',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss']
})
export class AddSubCategory implements OnInit {

  categoryOption;
  category;
  name;
  addSubCategoryForm = this.builder.group({
    name: this.builder.control('', Validators.required),
    category: this.builder.control('', Validators.required),
  })
  constructor(
    private productSerivce: ProductService,
    private builder: FormBuilder,
    private ref: DynamicDialogRef,
    private productCpn: ProductManagement


  ) { }
  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.productSerivce.getCategory().subscribe({
      next: (res) => this.categoryOption = res
    })
  }



  addNewSubCategory() {
    this.productSerivce.addNewSubCategory(this.addSubCategoryForm.value).subscribe({
      next: (res) => {
        this.ref.close();
        this.productCpn.showToast("Success", "success")
      }
    })
  }

}
