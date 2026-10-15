import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApolloGraphqlService } from '../../../api/apollo-graphql.service';
import { Proficiency_Detailed } from '../../../api/queries/proficiency';
import { CommonDetailsComponent } from '../common-details/common-details.component';

@Component({
  selector: 'app-proficiency-details',
  templateUrl: '../common-details/common-details.component.html',
  styleUrls: ['../common-details/common-details.component.scss'],
})
export class ProficiencyDetailsComponent extends CommonDetailsComponent implements OnInit {
  @Output()
  confirm = new EventEmitter<{resource: string, index: string}>();
  @Input()
  index: string | undefined
  @Input()
  fnCanConfirm: ((resource: string, index: string) => boolean) | undefined;
  title: string = "Proficiency";

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
      this.apollo_system.proficiency_detail(this.index, result => {
        this.loading = result.loading;
        this.error = result.loading == undefined;
        this.details = undefined;
        if(result.data.proficiency != undefined)
          this.details = this.convert(result.data.proficiency);
      });
    }
  }

  convert(data: Proficiency_Detailed){
    let details: typeof this.details = []

    details.push({label: "Name", value: data.name})
    details.push({label: "Type", value:data.type})
    details.push({label: "Classes", values:data.classes.map(c=>(
      {value:c.name, ref:{resource:"classes", index: c.index}}
    ))})
    details.push({label: "Races", values:data.races.map(r=>(
      {value:r.name, ref:{resource:(r.race)?"subraces":"races", index:r.index}}
    ))})
    return details;
  }

}