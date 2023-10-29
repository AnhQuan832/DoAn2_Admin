import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service'
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductManagement } from '../product-management/product-management.component';

@Component({
  selector: 'app-charts',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategory implements OnInit {

  brandFile: any;
  imgUrl;
  name: string;
  brandLogo: any;

  constructor(
    private productSerivce: ProductService,
    private productCpn: ProductManagement,
    private ref: DynamicDialogRef,


  ) { }
  ngOnInit(): void {
  }




  addNewCategory() {
    this.productSerivce.addNewCategory(this.name).subscribe({
      next: (res) => {
        this.productCpn.showToast("Success", "success")
        setTimeout(() => {
          this.ref.close();
        }, 100);
      }
    })
  }

}
