import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class FileService {

  private FILES_BASE = "/files/"

  constructor(
    private http: HttpClient
  ) { }

  uploadFile(file: FormData){
    return this.http.post(this.FILES_BASE+"read", file, {
      reportProgress: true,
      observe: 'events'
    }) 
  }
}
