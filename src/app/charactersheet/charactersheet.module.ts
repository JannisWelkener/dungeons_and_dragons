import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CharactersheetPageRoutingModule } from './charactersheet-routing.module';

import { CharactersheetPage } from './charactersheet.page';
import { InventoryComponent } from "./inventory/inventory.component";

@NgModule({
    declarations: [CharactersheetPage, InventoryComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CharactersheetPageRoutingModule,
    ]
})
export class CharactersheetPageModule {}
