import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { StorageService } from 'src/app/services/storage.service';
import { VoucherService } from 'src/app/services/voucher.service';
import { VoucherDetailComponent } from '../voucher-management/voucher-detail/voucher-detail.component';
import { OrderService } from 'src/app/services/order.service';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
    selectedVouchers;
    listVoucher;
    ref: DynamicDialogRef;
    constructor(
        private router: Router,
        private dialogService: DialogService,
        private storageSerive: StorageService,
        private messageService: MessageService,
        private orderService: OrderService
    ) {}

    ngOnInit() {
        this.getListVoucher();
    }

    getListVoucher() {
        this.orderService.getPaymentInfo().subscribe({
            next: (res) => {
                this.listVoucher = res;
            },
        });
    }

    openDetail(data?) {
        this.ref = this.dialogService.open(OrderDetailComponent, {
            position: 'center',
            data: data,
            width: '650px',
        });

        this.ref.onClose.subscribe(() => {
            this.getListVoucher();
        });
    }

    showToast() {}
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    getSeverity(status: string) {
        switch (status) {
            case 'COMPLETED':
                return 'success';
            case 'PENDING':
                return 'info';
            case 'RETURN':
                return 'warning';
            default:
                return 'danger';
        }
    }
}
