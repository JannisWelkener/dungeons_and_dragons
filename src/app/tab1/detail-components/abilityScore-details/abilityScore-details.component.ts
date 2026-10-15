import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApolloGraphqlService } from '../../../api/apollo-graphql.service';
import { AbilityScore_Detailed } from '../../../api/queries/abilityScore';
import { CommonDetailsComponent } from '../common-details/common-details.component';

@Component({
  selector: 'app-ability-score-details',
  templateUrl: '../common-details/common-details.component.html',
  styleUrls: ['../common-details/common-details.component.scss'],
})
export class AbilityScoreDetailsComponent extends CommonDetailsComponent implements OnInit {
  @Output()
  confirm = new EventEmitter<{resource: string, index: string}>();
  @Input()
  index: string | undefined
  @Input()
  fnCanConfirm: ((resource: string, index: string) => boolean) | undefined;
  title: string = "AbilityScore";

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
      this.apollo_system.abilityScore_detail(this.index, result => {
        this.loading = result.loading;
        this.error = result.loading == undefined;
        this.details = undefined;
        if(result.data.abilityScore != undefined)
          this.details = this.convert(result.data.abilityScore);
      });
    }
  }

  convert(data: AbilityScore_Detailed){
    let details: typeof this.details = []

    details.push({label: "Full Name", value: data.full_name})
    details.push({label: "Name", value: data.name})
    details.push({label: "Description", values: data.desc.map(d => ({value:d}))})
    details.push({label: "Skills", values: data.skills.map(s => ({
      value: s.name,
      ref: {resource: "skills", index: s.index}
    }))})
    return details;
  }

}