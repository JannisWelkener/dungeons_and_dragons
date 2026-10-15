import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiceRenderComponent } from './dice-render.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [DiceRenderComponent],
  exports: [DiceRenderComponent]
})
export class DiceRenderComponentModule {}
