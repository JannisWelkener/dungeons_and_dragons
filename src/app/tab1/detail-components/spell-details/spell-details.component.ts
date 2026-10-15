import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApolloGraphqlService } from '../../../api/apollo-graphql.service';
import { Spell_Detailed } from '../../../api/queries/spell';
import { CommonDetailsComponent } from '../common-details/common-details.component';

@Component({
  selector: 'app-spell-details',
  templateUrl: '../common-details/common-details.component.html',
  styleUrls: ['../common-details/common-details.component.scss'],
})
export class SpellDetailsComponent extends CommonDetailsComponent implements OnInit {
  @Output()
  confirm = new EventEmitter<{resource: string, index: string}>();
  @Input()
  index: string | undefined
  @Input()
  fnCanConfirm: ((resource: string, index: string) => boolean) | undefined;
  title: string = "Spell";

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
      this.apollo_system.spell_detail(this.index, result => {
        this.loading = result.loading;
        this.error = result.loading == undefined;
        this.details = undefined;
        if(result.data.spell != undefined)
          this.details = this.convert(result.data.spell);
      });
    }
  }

  components(short: ("V"| "S"| "M")[]): string{
    return short.map(s => {
      switch(s){
        case "V": return "Verbal";
        case "S": return "Somatic";
        case "M": return "Material";
      }
    }).join(", ");
  }

  area_of_effect(aoe: {size: number, type: 'sphere' | 'cone' | 'cylinder' | 'line' | 'cube'}): string {
    return aoe.type + " ("+aoe.size+")";
  }

  classes(cls: {index: string, name: string}[]): {value: string, ref:{resource:"classes", index:string}}[]{
    return cls.map(c=>(
      {value:c.name, ref:{resource: "classes", index:c.index}}
    ))
  }

  subclasses(cls: {index: string, name: string}[]): {value: string, ref:{resource:"subclasses", index:string}}[]{
    return cls.map(c=>(
      {value:c.name, ref:{resource: "subclasses", index:c.index}}
    ))
  }

  convert(spell: Spell_Detailed){
    let details: typeof this.details = []

    details.push({label: "Name", value: spell.name})
    details.push({label: "Description", values: spell.desc.map(d=>({value:d}))})
    if(spell.higher_level)
      details.push({label: "High Level Description", values: spell.higher_level.map(h=>({value:h}))})
    details.push({label: "Range", value: spell.range})
    details.push({label: "Components", value: this.components(spell.components)})
    details.push({label: "Material", value: spell.material})
    if(spell.area_of_effect)
      details.push({label: "Area of Effect", value: this.area_of_effect(spell.area_of_effect)})
    details.push({label: "Ritual allowed", value: spell.ritual})
    details.push({label: "Concentration required", value: spell.concentration})
    details.push({label: "Duration", value: spell.duration})
    details.push({label: "Casting Time", value: spell.casting_time})
    details.push({label: "Level", value: spell.level})
    details.push({label: "Attack Type", value: spell.attack_type})
    details.push({label: "School", value: spell.school.name, ref:{resource: "magicSchools", index: spell.school.index}})
    details.push({label: "Classes", values: this.classes(spell.classes)})
    details.push({label: "Subclasses", values: this.subclasses(spell.subclasses)})

    return details;
  }

}
