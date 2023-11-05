import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { LoginComponent } from './login/login.component';
import { ProductManagement } from './product-management/product-management.component'
import { ProductDetailComponent } from './product-detail/product-detail.component'
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [

  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'adoption-request',
    component: ProductManagement,
    data: {
      title: 'Product management'
    }
  },
  {
    path: 'product-detail/:id',
    component: ProductDetailComponent,
    data: {
      title: 'Product Detail'
    }
  },

  {
    path: 'chat',
    component: ChatComponent,
    data: {
      title: 'Tin nhắn'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
