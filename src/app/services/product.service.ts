import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShelterService } from './shelter.service';
import { API } from '../constant/enum';
import { catchError, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProduct() {
    let headers = this.getHttpHeader();
    return this.http.get(API.PRODUCT.END_POINT.PRODUCT, { headers }).pipe(
      map((data: any) => {
        if (data.meta.statusCode === API.PRODUCT.STATUS.GET_PRODUCT_SUCCESS) {
          return data.data.productList
        }
        else {
          return [];
        }
      }),
      catchError((err) => {
        throw new Error(err)
      })
    );
  }

  getProduct(id) {
    let headers = this.getHttpHeader();
    return this.http.get(API.PRODUCT.END_POINT.PRODUCT + `/${id}`, { headers }).pipe(
      map((data: any) => {
        if (data.meta.statusCode === API.PRODUCT.STATUS.GET_PRODUCT_SUCCESS) {
          return data.data.product
        }
        else {
          return [];
        }
      }),
      catchError((err) => {
        throw new Error(err)
      })
    );
  }

  getCategory() {
    return this.http.get(API.PRODUCT.END_POINT.CATEGORY).pipe(
      map((data: any) => {
        if (data.meta.statusCode === API.PRODUCT.STATUS.GET_PRODUCT_SUCCESS) {
          return data.data.categoryList
        }
        else {
          return [];
        }
      }),
      catchError((err) => {
        throw new Error(err)
      })
    );
  }

  getSubCategory(categoryId?) {
    return this.http.get(API.PRODUCT.END_POINT.SUB_CATEGORY + `/${categoryId}`).pipe(
      map((data: any) => {
        if (data.meta.statusCode === API.PRODUCT.STATUS.GET_PRODUCT_SUCCESS) {
          return data.data.subCategoryList
        }
        else {
          return [];
        }
      }),
      catchError((err) => {
        throw new Error(err)
      })
    );
  }

  getBrand() {
    return this.http.get(API.PRODUCT.END_POINT.BRAND).pipe(
      map((data: any) => {
        if (data.meta.statusCode === API.PRODUCT.STATUS.GET_PRODUCT_SUCCESS) {
          return data.data.brandList
        }
        else {
          return [];
        }
      }),
      catchError((err) => {
        throw new Error(err)
      })
    );
  }

  getAttribute() {
    return this.http.get(API.PRODUCT.END_POINT.ATTRIBUTES).pipe(
      map((data: any) => {
        if (data.meta.statusCode === API.PRODUCT.STATUS.GET_PRODUCT_SUCCESS) {
          return data.data.productList
        }
        else {
          return [];
        }
      }),
      catchError((err) => {
        throw new Error(err)
      })
    );
  }

  addNewProduct(formData: FormData) {
    return this.http.post(API.PRODUCT.END_POINT.PRODUCT, formData, { headers: this.getHttpHeader() }).pipe(
      map((data: any) => {
        if (data.meta.statusCode === API.PRODUCT.STATUS.GET_PRODUCT_SUCCESS) {
          return true;
        }
        else
          return false;

      }),
      catchError((err) => {
        throw new Error(err)
      })
    );
  }



  addNewBrand(formData: FormData) {
    return this.http.post(API.PRODUCT.END_POINT.BRAND, formData, { headers: this.getHttpHeader() })
  }


  addNewCategory(name) {
    return this.http.post(API.PRODUCT.END_POINT.CATEGORY, { name: name }, { headers: this.getHttpHeader() })
  }

  addNewSubCategory(form) {
    return this.http.post(API.PRODUCT.END_POINT.SUB_CATEGORY, form, { headers: this.getHttpHeader() })
  }

  addNewAttribute(attribute, productId) {
    return this.http.post(API.PRODUCT.END_POINT.ADD_ATTRIBUTES + `/${productId}`, { attribute })
  }
  updateProduct(formData) {
    return this.http.put(API.PRODUCT.END_POINT.PRODUCT, formData, { headers: this.getHttpHeader() }).pipe(
      map((data: any) => {
        if (data.meta.statusCode === API.PRODUCT.STATUS.GET_PRODUCT_SUCCESS) {
          return true;
        }
        else
          return false;

      }),
      catchError((err) => {
        throw new Error(err)
      })
    );
  }

  updateImages(id, formData) {
    return this.http.put(API.PRODUCT.END_POINT.IMAGES + `/${id}`, formData, { headers: this.getHttpHeader() }).pipe(
      map((data: any) => {
        if (data.meta.statusCode === API.PRODUCT.STATUS.GET_PRODUCT_SUCCESS) {
          return true;
        }
        else
          return false;

      }),
      catchError((err) => {
        throw new Error(err)
      })
    );
  }


  getHttpHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem("jwtToken"))}`,
    });
  }

}
