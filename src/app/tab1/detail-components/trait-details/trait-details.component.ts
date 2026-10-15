import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApolloGraphqlService } from '../../../api/apollo-graphql.service';
import { Trait_Detailed } from '../../../api/queries/trait';
import { CommonDetailsComponent } from '../common-details/common-details.component';

@Component({
  selector: 'app-trait-details',
  templateUrl: '../common-details/common-details.component.html',
  styleUrls: ['../common-details/common-details.component.scss'],
})
export class TraitDetailsComponent extends CommonDetailsComponent implements OnInit {
  @Output()
  confirm = new EventEmitter<{resource: string, index: string}>();
  @Input()
  index: string | undefined
  @Input()
  fnCanConfirm: ((resource: string, index: string) => boolean) | undefined;
  title: string = "Trait";

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
      this.apollo_system.trait_detail(this.index, result => {
        this.loading = result.loading;
        this.error = result.loading == undefined;
        this.details = undefined;
        if(result.data.trait != undefined)
          this.details = this.convert(result.data.trait);
      });
    }
  }

  convert(data: Trait_Detailed){
    let details: typeof this.details = []

    details.push({label: "Name", value: data.name})
    details.push({label: "Description", values: data.desc.map(d=>({value:d}))})
    if(data.parent)
      details.push({label: "Parent Trait", value:data.parent.name, ref:{resource:"traits", index:data.parent.index}})
    details.push({label: "Proficiencies", values: data.proficiencies.map(p=>(
      {value:p.name, ref:{resource:"proficiencies", index: p.index}}
    ))})
    details.push({label: "Races", values: data.races.map(r=>(
      {value:r.name, ref:{resource:"races", index: r.index}}
    ))})
    details.push({label: "Subraces", values: data.subraces.map(r=>(
      {value:r.name, ref:{resource:"subraces", index: r.index}}
    ))})
    if(data.language_options)
      details.push({label:"Language Options (Choose "+data.language_options.choose+")",
        values:data.language_options.from.options.map(l=>(
          {value:l.item.name, ref:{resource:"languages", index:l.item.index}}
        ))})
    if(data.trait_specific && data.trait_specific.damage_type)
      details.push({label:"Damage Type", value:data.trait_specific.damage_type.name,
        ref:{resource:"damageTypes", index: data.trait_specific.damage_type.index}})
    if(data.trait_specific && data.trait_specific.breath_weapon)
      details.push({label:"Breath Weapon",
        value:data.trait_specific.breath_weapon.name+": "+data.trait_specific.breath_weapon.desc})
    if(data.trait_specific && data.trait_specific.spell_options)
      details.push({label: "Spell Options (Choose "+data.trait_specific.spell_options.choose+")",
        values: data.trait_specific.spell_options.from.options.map(s=>(
          {value: s.item.name, ref:{resource:"spells", index: s.item.index}}
        ))})
    if(data.trait_specific && data.trait_specific.subtrait_options)
      details.push({label: "Subtrait Options (Choose "+data.trait_specific.subtrait_options.choose+")",
        values: data.trait_specific.subtrait_options.from.options.map(t=>(
          {value: t.item.name, ref: {resource:"traits", index: t.item.index}}
        ))})

    return details;
  }

  //TODO: Proficiency Choices
    /*proficiency_choices: undefined | {
      choose: number
      from: {
        options: {
          item: undefined | {
            index: string
            name: string
          }
          choice: undefined | {
            choose: number
            from: {
              options: {
                item: undefined | {
                  index: string
                  name: string
                }
              }
            }
          }
        }
      }
    }
    */
}