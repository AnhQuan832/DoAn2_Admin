import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StorageService } from 'src/app/services/storage.service';
import { ProductImportDetailComponent } from '../product-import-detail/product-import-detail.component';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-product-import',
    templateUrl: './product-import.component.html',
    styleUrls: ['./product-import.component.scss'],
})
export class ProductImportComponent implements OnInit {
    products: any[] = [];

    product: any = {};

    selectedProducts: any[] = [];

    ref: DynamicDialogRef;

    constructor(
        private productService: ProductService,
        private router: Router,
        private dialogService: DialogService,
        private storageSerive: StorageService,
        private messageService: MessageService
    ) {}
    ngOnInit(): void {
        this.getAllImports();
    }

    private getAllImports() {
        this.productService.getAllImport().subscribe({
            next: (res) => (this.products = res),
        });
    }

    importProducts() {
        this.ref = this.dialogService.open(ProductImportDetailComponent, {
            header: 'Import Products',
        });

        this.ref.onClose.subscribe(() => {
            this.productService.getAllImport().subscribe({
                next: (res) => this.getAllImports(),
            });
        });
    }

    onRowSelect(data) {
        this.productService.getInvoidGroup(data.importInvoiceId).subscribe({
            next: (res) => {
                this.ref = this.dialogService.open(
                    ProductImportDetailComponent,
                    {
                        header: 'Import Details',
                        data: res,
                    }
                );
            },
        });
    }
}
