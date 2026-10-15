import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApolloGraphqlService } from '../../../api/apollo-graphql.service';
import { Background_Detailed } from '../../../api/queries/background';
import { CommonDetailsComponent } from '../common-details/common-details.component';

@Component({
  selector: 'app-background-details',
  templateUrl: '../common-details/common-details.component.html',
  styleUrls: ['../common-details/common-details.component.scss'],
})
export class BackgroundDetailsComponent extends CommonDetailsComponent implements OnInit {
  @Output()
  confirm = new EventEmitter<{resource: string, index: string}>();
  @Input()
  index: string | undefined
  @Input()
  fnCanConfirm: ((resource: string, index: string) => boolean) | undefined;
  title: string = "Background";

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
      this.apollo_system.background_detail(this.index, result => {
        this.loading = result.loading;
        this.error = result.loading == undefined;
        this.details = undefined;
        if(result.data.background != undefined)
          this.details = this.convert(result.data.background);
      });
    }
  }

  convert(data: Background_Detailed){
    let details: typeof this.details = []

    details.push({label: "Name", value: data.name})
    details.push({label: "Bonds (Choose "+data.bonds.choose+")", values: data.bonds.from.options.map(b => ({value:b.string}))})
    details.push({label: "Feature: "+data.feature.name, values: data.feature.desc.map(d=>({value: d}))})
    details.push({label: "Flaws (Choose "+data.flaws.choose+")", values: data.flaws.from.options.map(f => ({value:f.string}))})
    details.push({label: "Ideals (Choose "+data.ideals.choose+")", values: data.ideals.from.options.map(f => ({value:f.desc}))})
    details.push({
      label: "Languages (Choose "+data.language_options.choose+")",
      values: data.language_options.from.options.map(l => (
        {value: l.item.name, ref:{resource:"languages", index:l.item.index}}))
    })
    details.push({
      label:"Personality Traits (Choose "+data.personality_traits.choose+")",
      values: data.personality_traits.from.options.map(p => (
        {value: p.string}
      ))
    })
    details.push({
      label: "Starting Equipment",
      values: data.starting_equipment.map(e => (
        {value: e.equipment.name+" ("+e.quantity+")", ref:{resource:"equipments", index:e.equipment.index}}
      ))
    })
    details.push({
      label: "Starting Equipment Choices",
      values: data.starting_equipment_options.map(e => (
        {value: e.from.equipment_category.name+" (Choose "+e.choose+")", ref:{resource:"equipmentCategries", index:e.from.equipment_category.index}}
      ))
    })
    details.push({
      label: "Starting Proficiencies",
      values: data.starting_proficiencies.map(p=>(
        {value:p.name, ref:{resource:"proficiencies", index:p.index}}
      ))
    })

    return details;
  }
}