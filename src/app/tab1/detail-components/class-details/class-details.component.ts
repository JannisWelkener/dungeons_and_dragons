import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApolloGraphqlService } from '../../../api/apollo-graphql.service';
import { Class_Detailed } from '../../../api/queries/class';
import { CommonDetailsComponent } from '../common-details/common-details.component';

@Component({
  selector: 'app-class-details',
  templateUrl: '../common-details/common-details.component.html',
  styleUrls: ['../common-details/common-details.component.scss'],
})
export class ClassDetailsComponent extends CommonDetailsComponent implements OnInit {
  @Output()
  confirm = new EventEmitter<{resource: string, index: string}>();
  @Input()
  index: string | undefined
  @Input()
  fnCanConfirm: ((resource: string, index: string) => boolean) | undefined;
  title: string = "Class";

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
      this.apollo_system.class_detail(this.index, result => {
        this.loading = result.loading;
        this.error = result.loading == undefined;
        this.details = undefined;
        if(result.data.class != undefined)
          this.details = this.convert(result.data.class);
      });
    }
  }

  convert(data: Class_Detailed){
    let details: typeof this.details = []

    details.push({label: "Name", value: data.name})
    details.push({label: "Hit Dice", value: data.hit_die})
    details.push({label: "Spells", values: data.spells.map(s =>(
      {value: s.name, ref:{resource:"spells", index:s.index}}
    ))})
    details.push({label: "Starting Equipment", values: data.starting_equipment.map(e=>(
      {value:e.equipment.name+" ("+e.quantity+")", ref:{resource:"equipments", index:e.equipment.index}}
    ))})
    details.push({label: "Starting Equipment Options", values: data.starting_equipment_options.map(e=>(
      {value:e.desc}
    ))})
    details.push({label: "Subclasses", values: data.subclasses.map(c=>(
      {value:c.name, ref:{resource:"classes", index:c.index}}
    ))})
    if(data.spellcasting)
      details.push({label: "Spellcasting",
        value:data.spellcasting.spellcasting_ability.name+" Level "+data.spellcasting.level,
        ref:{resource:"abilityScores", index:data.spellcasting.spellcasting_ability.index}
      })
    details.push({label: "Saving Throws", values: data.saving_throws.map(s=>(
      {value:s.full_name, ref:{resource:"abilityScores", index:s.index}}
    ))})
    details.push({label: "Proficiencies", values: data.proficiencies.map(p=>(
      {value:p.name, ref:{resource:"proficiencies", index:p.index}}
    ))})
    details.push({label: "Proficiency Choices", values: data.proficiency_choices.map(p=>(
      {value:p.desc}
    ))})

    return details;
  }

}