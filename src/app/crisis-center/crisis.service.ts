import { Injectable } from '@angular/core';

export class Crisis {
  constructor(
    public id: number,
    public name: string
  ) {}
}

const CRISES = [
  new Crisis(1, 'Dragon Burning Cities'),
  new Crisis(2, 'Sky Rains Great White Sharks'),
  new Crisis(3, 'Giant Asteroid Heading For Earth'),
  new Crisis(4, 'Procrastinators Meeting Again'),
];

@Injectable()
export class CrisisService {
  getCrises(): Promise<Crisis[]> {
    return Promise.resolve(CRISES);
  }

  getCrisis(id: number): Promise<Crisis> {
    return Promise.resolve(CRISES)
            .then(response => response.find( hero => hero.id === id));
  }

  // See the "Take it slow" appendix
  getCrisesSlowly(): Promise<Crisis[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getCrises()), 2000);
    });
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/