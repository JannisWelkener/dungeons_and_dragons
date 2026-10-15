import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApolloGraphqlService } from '../../../api/apollo-graphql.service';
import { Subrace_Detailed } from '../../../api/queries/subrace';
import { CommonDetailsComponent } from '../common-details/common-details.component';

@Component({
  selector: 'app-subrace-details',
  templateUrl: '../common-details/common-details.component.html',
  styleUrls: ['../common-details/common-details.component.scss'],
})
export class SubraceDetailsComponent extends CommonDetailsComponent implements OnInit {
  @Output()
  confirm = new EventEmitter<{resource: string, index: string}>();
  @Input()
  index: string | undefined
  @Input()
  fnCanConfirm: ((resource: string, index: string) => boolean) | undefined;
  title: string = "Subrace";

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
      this.apollo_system.subrace_detail(this.index, result => {
        this.loading = result.loading;
        this.error = result.loading == undefined;
        this.details = undefined;
        if(result.data.subrace != undefined)
          this.details = this.convert(result.data.subrace);
      });
    }
  }

  convert(data: Subrace_Detailed){
    let details: typeof this.details = []

    details.push({label: "Name", value: data.name})
    details.push({label: "Description", value: data.desc})
    details.push({label: "Race", value: data.race.name, ref:{resource:"races", index:data.race.index}})
    details.push({label: "Traits", values: data.racial_traits.map(t=>(
      {value:t.name, ref:{resource:"traits", index:t.index}}
    ))})
    details.push({label: "Starting Proficiencies", values: data.starting_proficiencies.map(p=>(
      {value:p.name, ref:{resource:"proficiencies", index:p.index}}
    ))})
    details.push({label:"Ability Bonuses", values: data.ability_bonuses.map(a=>(
      {value:a.bonus+" "+a.ability_score.full_name, ref:{resource:"abilityScores", index:a.ability_score.index}}
    ))})
    if(data.language_options)
      details.push({label:"Language Options (Choose "+data.language_options.choose+")",
        values:data.language_options.from.options.map(l=>(
          {value:l.item.name, ref:{resource:"languages", index:l.item.index}}
        ))})

    return details;
  }

}