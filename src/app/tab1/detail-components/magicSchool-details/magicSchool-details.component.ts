import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApolloGraphqlService } from '../../../api/apollo-graphql.service';
import { MagicSchool_Detailed } from '../../../api/queries/magicSchool';
import { CommonDetailsComponent } from '../common-details/common-details.component';

@Component({
  selector: 'app-magic-school-details',
  templateUrl: '../common-details/common-details.component.html',
  styleUrls: ['../common-details/common-details.component.scss'],
})
export class MagicSchoolDetailsComponent extends CommonDetailsComponent implements OnInit {
  @Output()
  confirm = new EventEmitter<{resource: string, index: string}>();
  @Input()
  index: string | undefined
  @Input()
  fnCanConfirm: ((resource: string, index: string) => boolean) | undefined;
  title: string = "MagicSchool";

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
      this.apollo_system.magicSchool_detail(this.index, result => {
        this.loading = result.loading;
        this.error = result.loading == undefined;
        this.details = undefined;
        if(result.data.magicSchool != undefined)
          this.details = this.convert(result.data.magicSchool);
      });
    }
  }

  convert(data: MagicSchool_Detailed){
    let details: typeof this.details = []

    details.push({label: "Name", value: data.name})
    details.push({label: "Description", value: data.desc})
    details.push({label: "Spells", values: data.spells.map(s=>(
      {value:s.name, ref:{resource:"spells", index:s.index}}
    ))})
    return details;
  }

}