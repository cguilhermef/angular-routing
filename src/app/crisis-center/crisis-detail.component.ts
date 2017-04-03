import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { slideDownAnimation } from '../animations';
import { Crisis } from './crisis.service';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'my-crisis-detail',
  template: `
    <div *ngIf="crisis">
      <h2>{{crisis.name}} details!</h2>
      <div>
        <label>id: </label>{{crisis.id}}
      </div>
      <div>
        <label>Name: </label>
        <input [(ngModel)]="editName" placeholder="name"/>
      </div>
      <p>
        <button (click)="save()">Save</button>
        <button (click)="cancel()">Cancel</button>
      </p>
    </div>
  `,
  animations: [slideDownAnimation]
})
export class CrisisDetailComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  crisis: Crisis;
  editName: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ds: DialogService
  ) {}

  ngOnInit(): void {
    this.route.data
      .subscribe((data: {crisis: Crisis}) => {
        this.editName = data.crisis.name;
        this.crisis = data.crisis;
      })
  }
  canDeactivate(): Promise<boolean> | boolean {
    if (!this.crisis ||  this.crisis.name === this.editName) {
      return true;
    }
    return this.ds.confirm('Discard changes?');
  }

  gotoCrises(): void {
    this.router.navigate(['../', {id: this.crisis.id}], {relativeTo: this.route });
  }

  cancel() {
    this.gotoCrises();
  }
  save() {
    this.crisis.name = this.editName;
    this.gotoCrises();
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/