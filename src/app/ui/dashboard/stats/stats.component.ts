import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  public totalRecords = 0
  public recordsFor7Days = 0
  public highTemperatureCases = 0
  public highTemperatureCasesFor7Days = 0
  public isLoading: boolean = false
  public errorMessage: string | undefined

  constructor(
    public authService: AuthService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.getCountTotalRecords()
    this.getCountRecordsFor7Days()
  }

  getCountTotalRecords(){
    this.dashboardService.getCountRecords()
      .subscribe(
        res => this.totalRecords = res,
        err => {
          this.isLoading = false
          if(err instanceof HttpErrorResponse){
            if(err.status == 401)
              this.errorMessage = "Login to view your data"
            if(err.status == 403)
              this.errorMessage = "Your account has not been activated. Please contact administrator."
          }
        }        
      )
  }

  getCountRecordsFor7Days(){
    this.dashboardService.getCountRecords7days()
      .subscribe(
        res => this.recordsFor7Days = res,
        err => console.error(err)        
      )
  }

}
