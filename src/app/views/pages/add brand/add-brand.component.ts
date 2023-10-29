import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service'
import { FormBuilder, Validators } from '@angular/forms';
import { FileHandler } from '../../../model/FileHandler';
import { Brand } from '../../../model/Brand';

import { DomSanitizer } from '@angular/platform-browser';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductManagement } from '../product-management/product-management.component';

@Component({
  selector: 'app-charts',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrand implements OnInit {

  brandFile: any;
  imgUrl;
  brand = {
    name: "",
  };
  brandLogo: any;
  name;

  constructor(
    private productSerivce: ProductService,
    private sanitizer: DomSanitizer,
    private productCpn: ProductManagement,
    private ref: DynamicDialogRef,

  ) { }
  ngOnInit(): void {
  }




  addNewBrand() {
    const brand = this.prepareFormData(this.brand);
    this.productSerivce.addNewBrand(brand).subscribe({
      next: (res) => {
        this.productCpn.showToast("Success", "success")
        setTimeout(() => {
          this.ref.close();
        }, 100);
      }
    })
  }

  prepareFormData(brand: any) {
    const formData = new FormData();
    console.log(this.brand)
    formData.append(
      'brand',
      new Blob([JSON.stringify(brand)], { type: 'application/json' })
    );
    formData.append(
      'image', this.brandLogo.file,
      this.brandLogo.file.name
    )

    return formData
  }
  selectImages(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imgUrl = reader.result;

      reader.readAsDataURL(file);

      const fileHandler: FileHandler = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }

      this.brandLogo = fileHandler
    }
  }

}
