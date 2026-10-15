import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApolloGraphqlService } from '../../../api/apollo-graphql.service';
import { WeaponProperty_Detailed } from '../../../api/queries/weaponProperty';
import { CommonDetailsComponent } from '../common-details/common-details.component';

@Component({
  selector: 'app-weapon-property-details',
  templateUrl: '../common-details/common-details.component.html',
  styleUrls: ['../common-details/common-details.component.scss'],
})
export class WeaponPropertyDetailsComponent extends CommonDetailsComponent implements OnInit {
  @Output()
  confirm = new EventEmitter<{resource: string, index: string}>();
  @Input()
  index: string | undefined
  @Input()
  fnCanConfirm: ((resource: string, index: string) => boolean) | undefined;
  title: string = "WeaponProperty";

  constructor(private apollo_system: ApolloGraphqlService, modalCtrl: ModalController) {
    super(modalCtrl);
  }

  ngOnInit() {
    this.loading = false;
    this.error = true;
    this.details = undefined;

    if( this.index ){
      this.loading = true;
      this.error = false;
      this.apollo_system.weaponProperty_detail(this.index, result => {
        this.loading = result.loading;
        this.error = result.loading == undefined;
        this.details = undefined;
        if(result.data.weaponProperty != undefined)
          this.details = this.convert(result.data.weaponProperty);
      });
    }
  }

  convert(data: WeaponProperty_Detailed){
    let details: typeof this.details = []

    details.push({label: "Name", value: data.name})
    details.push({label: "Description", values: data.desc.map(d=>({value:d}))})
    return details;
  }

}