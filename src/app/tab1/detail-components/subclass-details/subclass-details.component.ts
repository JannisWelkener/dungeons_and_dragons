import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApolloGraphqlService } from '../../../api/apollo-graphql.service';
import { Subclass_Detailed } from '../../../api/queries/subclass';
import { CommonDetailsComponent } from '../common-details/common-details.component';

@Component({
  selector: 'app-subclass-details',
  templateUrl: '../common-details/common-details.component.html',
  styleUrls: ['../common-details/common-details.component.scss'],
})
export class SubclassDetailsComponent extends CommonDetailsComponent implements OnInit {
  @Output()
  confirm = new EventEmitter<{resource: string, index: string}>();
  @Input()
  index: string | undefined
  @Input()
  fnCanConfirm: ((resource: string, index: string) => boolean) | undefined;
  title: string = "Subclass";

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
      this.apollo_system.subclass_detail(this.index, result => {
        this.loading = result.loading;
        this.error = result.loading == undefined;
        this.details = undefined;
        if(result.data.subclass != undefined)
          this.details = this.convert(result.data.subclass);
      });
    }
  }

  private spells(spells: {
    prerequisites: {
      index: string
      name: undefined | string //Feature-Requirement
      level: undefined | number //Level-Requirement
    }[]
    spell: {
      index: string
      name: string
    }
  }[]){
    let result: {value: string, ref:{resource: string, index: string}}[] = []
    for(let spell of spells){
      result.push({value: spell.spell.name, ref:{resource:"spells", index: spell.spell.index}})
      for(let requirement of spell.prerequisites){
        if(requirement.level)
          result.push({value: "- Requires Level: "+requirement.level, ref:{resource:"levels",index:requirement.index}})
        if(requirement.name)
          result.push({value: "- Requires Feature: "+requirement.name, ref:{resource:"features",index:requirement.index}})
      }
    }
    return result;
  }

  convert(data: Subclass_Detailed){
    let details: typeof this.details = []

    details.push({label: "Name", value: data.name})
    details.push({label: "Class", value:data.class.name, ref:{resource:"classes", index:data.class.index}})
    details.push({label: "Subclass Flavor", value: data.subclass_flavor})
    details.push({label: "Description", values: data.desc.map(d=>({value:d}))})
    if(data.spells)
      details.push({label: "Spells (with Prerequisites)", values:this.spells(data.spells)})
    details.push({label: "Subclass Levels", values: data.subclass_levels.map(l=>(
      {value:"Level "+l.level, ref:{resource:"levels", index:l.index}}
    ))})

    return details;
  }

}