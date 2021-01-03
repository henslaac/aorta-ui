import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Record } from 'src/app/models/record'
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-records-past',
  templateUrl: './records-past.component.html',
  styleUrls: ['./records-past.component.css']
})
export class RecordsPastComponent implements OnInit {
  public isLoading: boolean = false
  public allRecords: Record[] | undefined
  public errorMessage: string | undefined

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRecords()
  }

  getRecords(){
    this.isLoading = true
    this.dashboardService.getRecordsFor7Days()
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
