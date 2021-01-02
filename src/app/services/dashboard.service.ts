import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http'
import { of, Observable, throwError } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import {LoaderService} from "../services/loader.service";
import {Record} from "../models/record"

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private RECORDS_BASE = "/files/"

  constructor(
    private http: HttpClient
  ) { }

  getAllRecords(): Observable<Record[]>{
    return this.http.get<Record[]>(this.RECORDS_BASE)
  }

  getCountRecords(): Observable<number>{
    return this.http.get<number>(this.RECORDS_BASE+"total-uploads")
  }

  getCountRecords7days(): Observable<number>{
    return this.http.get<number>(this.RECORDS_BASE+"uploads-for-7-days")
  }
}
