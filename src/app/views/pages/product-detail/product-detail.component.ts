import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { FileHandler } from 'src/app/model/FileHandler';
import { PetAdoptionService } from 'src/app/services/pet-adoption.service';
import { ProductService } from 'src/app/services/product.service';
import { AddBrand } from '../add brand/add-brand.component';
import { AddCategory } from '../add category/add-category.component';
import { AddSubCategory } from '../add sub-category/add-sub-category.component';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.less'],
  providers: [DialogService]
})
export class ProductDetailComponent implements OnInit {
  imgs: FileHandler[] = [];
  attribute = {
    COLOR: [],
    SIZE: []
  }
  isAddAtt: boolean = false;
  brandOption;
  categoryOption;
  subCategoryOption;
  ref: DynamicDialogRef;
  product: any;
  listImages: string[];
  removedImgs: Array<string> = new Array
  isAddAttribute: boolean = false;
  addProductForm = this.builder.group({
    name: this.builder.control('', Validators.required),
    brand: this.builder.control('', Validators.required),
    category: this.builder.control('', Validators.required),
    subCategory: this.builder.control('', Validators.required),
    price: this.builder.control('', Validators.required),
    detail: this.builder.control(''),
    description: this.builder.control(''),
    petTypeId: this.builder.control(''),
    size: this.builder.control(''),
    color: this.builder.control(''),
  })

  constructor(
    private productSerivce: ProductService,
    private builder: FormBuilder,
    private sanitizer: DomSanitizer,
    private dialogService: DialogService,
    private storageService: StorageService
  ) {
  }
  ngOnInit(): void {
    this.initialize();
  }

  private initialize() {
    this.product = this.storageService.getItemLocal("currentProduct");
    this.listImages = this.product.images;
    this.addProductForm.patchValue(this.product)
    this.addProductForm.patchValue({ category: this.product.subCategory.category })

    this.productSerivce.getAttribute().subscribe({
      next: (res) => {
        this.attribute = res;
      }
    })
    this.productSerivce.getBrand().subscribe({
      next: (res) => this.brandOption = res
    })
    this.productSerivce.getCategory().subscribe({
      next: (res) => this.categoryOption = res
    })
    this.productSerivce.getSubCategory(this.product.subCategory.category.categoryId).subscribe({
      next: (res) => this.subCategoryOption = res
    })
  }

  prepareFormData(product: any) {
    const formData = new FormData();
    const data = product.value
    formData.append(
      'productDTO',
      new Blob([JSON.stringify(data)], { type: 'application/json' })
    );
    for (let i = 0; i < this.imgs.length; i++) {
      formData.append(
        'images', this.imgs[i].file,
        this.imgs[i].file.name
      )
    }

    return formData
  }

  onAddBrand() {
    this.dialogService.open(AddBrand, {
      header: 'Add new Brand'
    })
  }

  onAddCategory() {
    this.dialogService.open(AddCategory, {
      header: 'Add new Category'

    })
  }

  onAddSubCategory() {
    this.dialogService.open(AddSubCategory, {
      header: 'Add new SubCategory'

    })
  }

  onAddAttribute(type: string) {
    this.productSerivce.addNewAttribute(this.addProductForm.get(`${type}`).value, this.product.productId).subscribe({
      next: (res) => console.log("add success")
    })
  }

  onSaveProduct() {
    this.addProductForm.patchValue({ petTypeId: '1' })
    console.log(this.addProductForm.get('brandId').value)
    this.productSerivce.addNewProduct(this.prepareFormData(this.addProductForm)).subscribe({
      next: (res) => {
        this.ref.close();
      },
      error: (err) => console.log(err)
    })
  }

  onShowAttribute() {
    this.isAddAtt = true;
  }

  public onSelectFiles(event) {
    for (let i = 0; i < event.currentFiles.length; i++) {
      const file = event.currentFiles[i];
      const fileHandler: FileHandler = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.imgs.push(fileHandler);
    }
  }

  onRemoveFile(event) {
    const newImgs = this.imgs.filter(file => file.file.name !== event.file.name)
    this.imgs = newImgs;
  }

  deleteImg(imgLink) {
    this.removedImgs.push(imgLink);
    this.listImages = this.listImages.filter(e => e !== imgLink);
  }
}
