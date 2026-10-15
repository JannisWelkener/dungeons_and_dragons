import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApolloGraphqlService } from '../../../api/apollo-graphql.service';
import { Race_Detailed } from '../../../api/queries/race';
import { CommonDetailsComponent } from '../common-details/common-details.component';

@Component({
  selector: 'app-race-details',
  templateUrl: '../common-details/common-details.component.html',
  styleUrls: ['../common-details/common-details.component.scss'],
})
export class RaceDetailsComponent extends CommonDetailsComponent implements OnInit {
  @Output()
  confirm = new EventEmitter<{resource: string, index: string}>();
  @Input()
  index: string | undefined
  @Input()
  fnCanConfirm: ((resource: string, index: string) => boolean) | undefined;
  title: string = "Race";

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
      this.apollo_system.race_detail(this.index, result => {
        this.loading = result.loading;
        this.error = result.loading == undefined;
        this.details = undefined;
        if(result.data.race != undefined)
          this.details = this.convert(result.data.race);
      });
    }
  }

  convert(data: Race_Detailed){
    let details: typeof this.details = []

    details.push({label: "Name", value: data.name})
    details.push({label: "Size", value: data.size})
    details.push({label: "Size Description", value: data.size_description})
    details.push({label: "Age", value: data.age})
    details.push({label: "Speed", value: data.speed})
    details.push({label: "Alignment", value: data.alignment})
    details.push({label: "Traits", values:data.traits.map(t=>(
      {value:t.name, ref:{resource:"traits", index:t.index}}
    ))})
    details.push({label: "Language Description", value: data.language_desc})
    details.push({label: "Languages", values:data.languages.map(l=>(
      {value:l.name, ref:{resource:"languages", index:l.index}}
    ))})
    if(data.language_options)
      details.push({label: "Language Options (Choose "+data.language_options.choose+")",
        values:data.language_options.from.options.map(l=>(
          {value:l.item.name, ref:{resource:"languages", index: l.item.index}}
      ))})
    details.push({label: "Ability Bonuses", values: data.ability_bonuses.map(a=>(
      {value:a.bonus+" "+a.ability_score.full_name, ref:{resource:"abilityScores", index:a.ability_score.index}}
    ))})
    if(data.ability_bonus_options)
      details.push({label: "Ability Bonus Options (Choose "+data.ability_bonus_options.choose+")",
        values:data.ability_bonus_options.from.options.map(a=>(
          {value:a.bonus+" "+a.ability_score.full_name, ref:{resource:"abilityScores", index:a.ability_score.index}}
      ))})
    details.push({label: "Starting Proficiencies", values:data.starting_proficiencies.map(p=>(
      {value:p.name, ref:{resource:"proficiencies", index:p.index}}
    ))})
    if(data.starting_proficiency_options)
      details.push({label: "Starting Proficiency Options", value:data.starting_proficiency_options.desc})


    return details;
  }

//   starting_proficiencies: {
//     index: string
//     name: string
//   }[]
//   starting_proficiency_options: undefined | {
//     desc: string
//   }

// }

}