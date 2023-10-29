import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/";

  constructor(private http: HttpClient) { }


}
