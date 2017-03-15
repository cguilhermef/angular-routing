import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  template: `
    <h2>HEROES</h2>
    <ul class="heroes">
      <li
        *ngFor="let hero of heroes | async"
        [class.selected]="isSelected(hero)"
        (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
  `,
  styleUrls: ['./hero-list.component.css'],
  providers: [HeroService]
})
export class HeroListComponent implements OnInit {
  title = 'Tour of Heroes';
  heroes: Observable<Hero[]>;
  selectedID: number;

  constructor(
    private service: HeroService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  isSelected(hero: Hero): boolean {
    return hero.id === this.selectedID;
  }

  ngOnInit() {
    this.heroes = this.route.params
      .switchMap((params: Params) => {
        this.selectedID = +params['id'];
        return this.service.getHeroes();
      })
  }

  onSelect(hero: Hero): void {
    this.router.navigate(['/hero', hero.id]);
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/