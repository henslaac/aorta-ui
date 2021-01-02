import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CompanyDocumentsComponent } from './ui/company-documents/company-documents.component';
import { AllRecordsComponent } from './ui/dashboard/all-records/all-records.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';
import { StatsComponent } from './ui/dashboard/stats/stats.component';
import { UploadComponent } from './ui/dashboard/upload/upload.component';
import { HomeComponent } from './ui/home/home.component';
import { LoginComponent } from './ui/login/login.component';
import { RegisterComponent } from './ui/register/register.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {
    path: "dashboard", 
    component: DashboardComponent,
    children: [
      {path: "stats", component: StatsComponent},
      {path: "upload", component: UploadComponent},
      {path: "all-records", component: AllRecordsComponent},
      {path: "", redirectTo: "stats", pathMatch: "full"}
    ],canActivate: [AuthGuard], data: { expectedRoles: null }
  },
  {path: "register", component: RegisterComponent},
  {path: "company-documents", component: CompanyDocumentsComponent},
  {path: "", redirectTo: "/home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
