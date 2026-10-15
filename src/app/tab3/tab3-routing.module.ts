import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersheetPage } from '../charactersheet/charactersheet.page';
//import { CharactersheetComponent } from '../charactersheet/charactersheet.component';
import { Tab3Page } from './tab3.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
  },{
    path: 'charactersheet',
    component: CharactersheetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
