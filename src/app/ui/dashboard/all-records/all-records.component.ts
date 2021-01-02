import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Record } from 'src/app/models/record';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-all-records',
  templateUrl: './all-records.component.html',
  styleUrls: ['./all-records.component.css']
})
export class AllRecordsComponent implements OnInit {

  public isLoading: boolean = false
  public allRecords: Record[] | undefined
  public errorMessage: string | undefined

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.getAllRecords()
  }

  getAllRecords(){
    this.isLoading = true
    this.dashboardService.getAllRecords()
      .subscribe(
        res => {
          this.allRecords = res
          this.isLoading = false
        },
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

}
