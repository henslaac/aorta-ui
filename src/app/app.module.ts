import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './ui/spinner/spinner.component';
import { LoginComponent } from './ui/login/login.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';
import { HomeComponent } from './ui/home/home.component';
import { RegisterComponent } from './ui/register/register.component';
import { FormsModule } from "@angular/forms";
import { CompanyDocumentsComponent } from './ui/company-documents/company-documents.component'; 
import { TokenInterceptorService } from './auth/token-interceptor.service';
import { StatsComponent } from './ui/dashboard/stats/stats.component';
import { UploadComponent } from './ui/dashboard/upload/upload.component';
import { AllRecordsComponent } from './ui/dashboard/all-records/all-records.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    RegisterComponent,
    CompanyDocumentsComponent,
    StatsComponent,
    UploadComponent,
    AllRecordsComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
