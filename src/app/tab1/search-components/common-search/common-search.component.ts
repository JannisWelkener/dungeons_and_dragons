import { EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailsModalComponent } from '../../detail-components/details-modal/details-modal.component';
import { SearchResultListComponent } from '../search-result-list/search-result-list.component';

type ListEntry = typeof SearchResultListComponent.entry;
export abstract class CommonSearchComponent {
  ListEntry: ListEntry = undefined as any;

  abstract loading: boolean;
  abstract error: boolean;
  abstract list: ListEntry[];
  abstract resource: string;

  abstract confirm: EventEmitter<{resource: string, index: string}>;
  abstract fnCanConfirm: undefined | ((resource: string, index: string) => boolean);

  constructor(private modalCtrl: ModalController){}

  onEntryClicked(identifier: string): void {
    this.openDetails(identifier);
  }

  onSearchSubmit(searchterm: any): void {
    this.search(searchterm)
  }

  openDetails(identifier: string){
    this.modalCtrl.create({
      component: DetailsModalComponent,
      componentProps: {index: identifier, resource: this.resource, fnCanConfirm: this.fnCanConfirm},
    }).then(modal => {
      modal.present()
      return modal.onDidDismiss()
    }).then(detail => {
      if(detail.role == 'confirm')
        this.confirm.emit(detail.data);
    });
  }
  abstract search(term: string): void;
}
