import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApolloGraphqlService } from 'src/app/api/apollo-graphql.service';
import { DetailsModalComponent } from 'src/app/tab1/detail-components/details-modal/details-modal.component';
import { SearchModalComponent } from 'src/app/tab1/search-components/search-modal/search-modal.component';

const inventoryResources = [
  "equipments",
  "magicItems"
];

type ItemReference = {
  resource: string
  index: string
}

type DisplayItem = {
  identifier: any
  label: string,
  buttons: {["+"]: boolean, ["-"]: boolean, ["del"]: boolean}
  ref?: ItemReference
}

type InventoryItem = {
  identifier: any,
  resource: string,
  index: string,
  count: number
}

type EventType = "add" | "remove" | "increase" | "decrease"
type InventoryEvent = {type: EventType, item: InventoryItem}

export type {DisplayItem, InventoryEvent}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit, OnChanges {
  @Input()
  items: undefined | InventoryItem[];
  @Output()
  event = new EventEmitter<InventoryEvent>();


  display: DisplayItem[] = [];

  constructor(private modalCtrl: ModalController, private gqlService: ApolloGraphqlService) { }

  ngOnInit() {this.update()}
  ngOnChanges(changes: SimpleChanges) {this.update()}

  async update(){
    let promises: Promise<DisplayItem>[] = (this.items || []).map(async item => {
      if(item.resource == 'equipments'){
        const equip = await this.gqlService.equipment_short(item.index);
        if (!equip)
          return {
            identifier: item.identifier,
            label: "Error Loading :(",
            buttons: {["+"]: false, ["-"]: false, ["del"]: true}
          };
        return {
          identifier: item.identifier,
          label: equip.name + ((item.count > 1) ? " (" + item.count + ")" : ""),
          buttons: {["+"]: true, ["-"]: item.count>1, ["del"]: item.count<=1},
          ref: { resource: "equipments", index: item.index }
        };
      }
      if(item.resource == 'magicItems'){
        const magic = await this.gqlService.magicItem_short(item.index);
        if (!magic)
          return {
            identifier: item.identifier,
            label: "Error Loading :(",
            buttons: {["+"]: false, ["-"]: false, ["del"]: true}
          };
        return {
          identifier: item.identifier,
          label: magic.name + ((item.count > 1) ? " (" + item.count + ")" : ""),
          buttons: {["+"]: true, ["-"]: item.count>1, ["del"]: item.count<=1},
          ref: { resource: "magicItems", index: item.index }
        };}
      return new Promise((res) => res({
        identifier: item.identifier,
        label: "Error: Invalid Resource :(",
        buttons: {["+"]: false, ["-"]: false, ["del"]: true}
      }));
    })

    this.display = await Promise.all(promises)
  }

  private findItem(identifier: string){
    return this.items?.find(item => item.identifier == identifier)
  }

  private emit(type: EventType, item: InventoryItem | undefined){
    if(item)
      this.event.emit({type: type, item: item});
  }

  onItemAddSubmitted(resource: string, index: string){
    this.emit("add", {identifier: null, resource: resource, index: index, count: 1})
  }
  onItemTrashClicked(identifier: string){
    this.emit("remove", this.findItem(identifier));
  }
  onItemPlusClicked(identifier: string){
    this.emit("increase", this.findItem(identifier));
  }
  onItemMinusClicked(identifier: string){
    this.emit("decrease", this.findItem(identifier));
  }

  private canAddToInventory(resource: string, index: string){
    return inventoryResources.includes(resource)
  }

  onAddInventoryItemClicked(resource: "magicItems" | "equipments"){
    this.modalCtrl.create({
      component: SearchModalComponent,
      componentProps: {
        resource: resource,
        fnCanConfirm: this.canAddToInventory,
      }
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss()
    }).then(detail => {
      if(detail.role == 'confirm'){
        this.onItemAddSubmitted(detail.data.resource, detail.data.index)
      }
    })
  }

  onItemClicked(ref: ItemReference | undefined){
    if(!ref)
      return;

    this.modalCtrl.create({
      component: DetailsModalComponent,
      componentProps: {
        resource: ref.resource,
        index: ref.index,
      }
    }).then(modal => modal.present())
  }
}
