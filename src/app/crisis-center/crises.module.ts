import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CrisisCenterRoutingModule } from './crisis-center-routing.module';
import { CrisisListComponent } from './crisis-list.component';
import { CrisisDetailComponent } from './crisis-detail.component';

import { CrisisService } from './crisis.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CrisisCenterRoutingModule
  ],
  declarations: [
    CrisisListComponent,
    CrisisDetailComponent
  ],
  providers: [CrisisService]
})
export class CrisisModule {}