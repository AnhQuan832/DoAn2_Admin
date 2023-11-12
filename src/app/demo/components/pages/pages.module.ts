import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ProductComponent } from './product/product.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        SharedModule
    ]
})
export class PagesModule { }
