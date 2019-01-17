import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

import { SideNavComponent } from './side-nav.component';

import { HistoryService } from '../services/history.service';

@NgModule({
  declarations: [SideNavComponent],
  imports: [CommonModule, FlexLayoutModule, FormsModule, MaterialModule],
  exports: [SideNavComponent],
  providers: [HistoryService]
})
export class SideNavModule {}
