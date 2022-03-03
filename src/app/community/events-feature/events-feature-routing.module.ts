import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsFeatureComponent } from './events-feature.component';

const routes: Routes = [{ path: '', component: EventsFeatureComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsFeatureRoutingModule { }
