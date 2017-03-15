import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { Crisis, CrisisService } from './crisis.service';

@Component({
  template: `
    <h2>CRISES</h2>
    <ul class="crises">
      <li
        *ngFor="let crisis of crises | async"
        [class.selected]="isSelected(crisis)"
        (click)="onSelect(crisis)">
        <span class="badge">{{crisis.id}}</span> {{crisis.name}}
      </li>
    </ul>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./crisis-list.component.css'],
  providers: [CrisisService]
})
export class CrisisListComponent implements OnInit {
  title = 'Tour of Heroes';
  crises: Observable<Crisis[]>;
  selectedID: number;

  constructor(
    private service: CrisisService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  isSelected(crisis: Crisis): boolean {
    return crisis.id === this.selectedID;
  }

  ngOnInit() {
    this.crises = this.route.params
      .switchMap((params: Params) => {
        this.selectedID = +params['id'];
        return this.service.getCrises();
      })
  }

  onSelect(crisis: Crisis): void {
    this.router.navigate([crisis.id], {relativeTo: this.route });
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/