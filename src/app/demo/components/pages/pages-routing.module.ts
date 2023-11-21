import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
        { path: 'order', loadChildren: () => import('./order/order.module').then(m => m.OrderModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
