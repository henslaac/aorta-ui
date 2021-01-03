import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Record } from '../../../models/record'

@Component({
  selector: 'app-record-details',
  templateUrl: './record-details.component.html',
  styleUrls: ['./record-details.component.css']
})
export class RecordDetailsComponent implements OnInit {

  public record: Record | undefined
  public errorMessage: string | undefined

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.record = this.dashboardService.currentRecord
  }

}
