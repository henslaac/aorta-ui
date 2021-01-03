import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import {Location} from '@angular/common'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.doLogout()
  }

  back(){
    this.location.back()
  }

}
