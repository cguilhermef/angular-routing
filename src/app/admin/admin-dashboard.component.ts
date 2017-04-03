import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SelectivePreloadStrategy } from '../selective-preload-strategy';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  sessionId: Observable<string>;
  token: Observable<string>;
  modules: string[];

  constructor(
    private route: ActivatedRoute,
    private sps: SelectivePreloadStrategy
  ) {
    this.modules = sps.preloadedModules;
  }

  ngOnInit() {
    this.sessionId = this.route
      .queryParams
      .map( params => params['session_id'] || 'None');

    this.token = this.route
      .fragment
      .map( fragment => fragment || 'None');
  }

}
