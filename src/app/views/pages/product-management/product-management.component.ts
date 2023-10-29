import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service'
import { StorageService } from '../../../services/storage.service'

import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddProduct } from '../add product/add-product.component'
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-charts',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
  providers: [DialogService]
})
export class ProductManagement implements OnInit {

  listProduct: any[];
  isLoading = true;
  ref: DynamicDialogRef;
  constructor(
    private productSerivce: ProductService,
    private router: Router,
    private dialogService: DialogService,
    private storageSerive: StorageService,
    private messageService: MessageService
  ) { }
  ngOnInit(): void {
    this.getAdoptionRequest();
  }
  async getAdoptionRequest() {
    await this.productSerivce.getAllProduct().subscribe({
      next: (res) => {
        this.listProduct = res;
        this.isLoading = false
      },
    })
  }

  addNewProduct() {
    this.ref = this.dialogService.open(AddProduct, {
      header: 'Add a new Product',
      width: '50%',
    });
  }

  getSeverity(status: string) {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'PENDING':
        return 'info';
      default:
        return 'danger';
    }
  }

  onRowSelect(data) {
    this.storageSerive.setItemLocal("currentProduct", data);
    this.router.navigate([`pages/product-detail/${data.productId}`])
  }

  public showToast(message, type) {
    this.messageService.add({ key: 'toast', severity: type, detail: message })
  }
}
