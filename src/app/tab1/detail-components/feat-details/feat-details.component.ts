import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApolloGraphqlService } from '../../../api/apollo-graphql.service';
import { Feat_Detailed } from '../../../api/queries/feat';
import { CommonDetailsComponent } from '../common-details/common-details.component';

@Component({
  selector: 'app-feat-details',
  templateUrl: '../common-details/common-details.component.html',
  styleUrls: ['../common-details/common-details.component.scss'],
})
export class FeatDetailsComponent extends CommonDetailsComponent implements OnInit {
  @Output()
  confirm = new EventEmitter<{resource: string, index: string}>();
  @Input()
  index: string | undefined
  @Input()
  fnCanConfirm: ((resource: string, index: string) => boolean) | undefined;
  title: string = "Feat";

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
      this.apollo_system.feat_detail(this.index, result => {
        this.loading = result.loading;
        this.error = result.loading == undefined;
        this.details = undefined;
        if(result.data.feat != undefined)
          this.details = this.convert(result.data.feat);
      });
    }
  }

  convert(data: Feat_Detailed){
    let details: typeof this.details = []

    details.push({label: "Name", value: data.name})
    details.push({label: "Description", values: data.desc.map(d=>(
      {value:d}
    ))})
    details.push({
      label: "Prerequisites",
      values: data.prerequisites.map(p=>(
        {
          value:p.minimum_score+" "+p.ability_score.full_name,
          ref:{resource:"abilityScores", index:p.ability_score.index
        }
      }))})

    return details;
  }

}