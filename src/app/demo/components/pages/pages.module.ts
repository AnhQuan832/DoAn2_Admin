import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ProductComponent } from './product/product.component';
import { SharedModule } from '../shared/shared.module';
import { OrderComponent } from './order/order.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
    declarations: [

        OrderComponent,
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        SharedModule,
        MultiSelectModule,
        InputTextModule,
        InputNumberModule,
    ]
})
export class PagesModule { }
