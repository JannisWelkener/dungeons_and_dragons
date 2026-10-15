import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharactersheetPage } from './charactersheet.page';

const routes: Routes = [
  {
    path: '',
    component: CharactersheetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharactersheetPageRoutingModule {}
