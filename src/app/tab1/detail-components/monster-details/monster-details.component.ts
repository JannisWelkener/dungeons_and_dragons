import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApolloGraphqlService } from '../../../api/apollo-graphql.service';
import { Monster_Detailed } from '../../../api/queries/monster';
import { CommonDetailsComponent } from '../common-details/common-details.component';

@Component({
  selector: 'app-monster-details',
  templateUrl: '../common-details/common-details.component.html',
  styleUrls: ['../common-details/common-details.component.scss'],
})
export class MonsterDetailsComponent extends CommonDetailsComponent implements OnInit {
  @Output()
  confirm = new EventEmitter<{resource: string, index: string}>();
  @Input()
  index: string | undefined
  @Input()
  fnCanConfirm: ((resource: string, index: string) => boolean) | undefined;
  title: string = "Monster";

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
      this.apollo_system.monster_detail(this.index, result => {
        this.loading = result.loading;
        this.error = result.loading == undefined;
        this.details = undefined;
        if(result.data.monster != undefined)
          this.details = this.convert(result.data.monster);
      });
    }
  }

  private armor_class(armor_class: {
    type: "dex" | "natural" | "armor" | "spell" | "condition"
    value: number
    desc: undefined | string
    armor: undefined | {
      index: string
      name: string
    }[]
    condition: undefined | {
      index: string
      name: string
      desc: string[]
    }
    spell: undefined | {
      index: string
      name: string
    }
  }[]){
    let result: {value: string, ref?:{resource:string,index:string}}[] = []

    for(let aClass of armor_class) {
      if(aClass.desc)
        result.push({value: aClass.desc});
      switch(aClass.type){
        case "dex": result.push({value:aClass.value+" DEX"}); break;
        case "natural": result.push({value:aClass.value+" natural"}); break;
        case "armor":
          result.push({value:aClass.value+" armor"});
          for(let equipment of aClass.armor || [])
            result.push({value:equipment.name, ref:{resource:"equipments", index: equipment.index}});
          break;
        case "condition":
          result.push({value:aClass.value+" conditional"});
          if(aClass.condition)
            result.push({value:aClass.condition.name, ref:{resource:"conditions", index:aClass.condition.index}})
          break;
        case "spell":
          result.push({value:aClass.value+" spelled"});
          if(aClass.spell)
            result.push({value:aClass.spell.name, ref:{resource:"spells", index:aClass.spell.index}})
          break;
      }
    }

    return result;
  }

  private speed(speed: {
    burrow: undefined | string
    climb: undefined | string
    fly: undefined | string
    swim: undefined | string
    walk: undefined | string
    hover: undefined | boolean
  }){
    let result: {value: string, ref?:{resource:string,index:string}}[] = []

    if(speed.burrow)
      result.push({value:"Burrow: "+speed.burrow})
    if(speed.climb)
      result.push({value:"Climb: "+speed.climb})
    if(speed.fly)
      result.push({value:"Fly: "+speed.fly})
    if(speed.swim)
      result.push({value:"Swim: "+speed.swim})
    if(speed.walk)
      result.push({value:"Walk: "+speed.walk})
    if(speed.hover != undefined)
      result.push({value:"Hover: "+speed.hover})

    return result;
  }
  private senses(senses: {
    blindsight: undefined | string
    darkvision: undefined | string
    tremorsense: undefined | string
    truesight: undefined | string
    passive_perception: undefined | number
  }){
    let result: {value: string, ref?:{resource:string,index:string}}[] = []

    if(senses.blindsight)
      result.push({value:"Blindsight: "+senses.blindsight})
    if(senses.darkvision)
      result.push({value:"Darkvision: "+senses.darkvision})
    if(senses.tremorsense)
      result.push({value:"Tremorsense: "+senses.tremorsense})
    if(senses.truesight)
      result.push({value:"Truesight: "+senses.truesight})
    if(senses.passive_perception)
      result.push({value:"Passive Perception: "+senses.passive_perception})

    return result;
  }

  convert(data: Monster_Detailed){
    let details: typeof this.details = [];

    details.push({label: "Image", value: data.image, special:"image"})
    details.push({label: "Name", value: data.name})
    details.push({label: "Size", value: data.size})
    details.push({label: "Type", value: data.type})
    if(data.subtype)
      details.push({label: "Subtype", value: data.subtype})
    details.push({label: "XP", value: data.xp})
    details.push({label: "Hit-Points", value: data.hit_points})
    details.push({label: "Hit Dice", value: data.hit_dice})
    details.push({label: "Hit Points Roll", value: data.hit_points_roll})
    details.push({label: "Description", value: data.desc})
    details.push({label: "Challenge-Rating", value: data.challenge_rating})
    details.push({label: "Armor", values:this.armor_class(data.armor_class)})
    details.push({label: "Charisma", value: data.charisma, ref:{resource:"abilityScores",index:"cha"}})
    details.push({label: "Constitution", value: data.constitution, ref:{resource:"abilityScores",index:"con"}})
    details.push({label: "Dexterity", value: data.dexterity, ref:{resource:"abilityScores",index:"dex"}})
    details.push({label: "Intelligence", value: data.intelligence, ref:{resource:"abilityScores",index:"int"}})
    details.push({label: "Strength", value: data.strength, ref:{resource:"abilityScores",index:"str"}})
    details.push({label: "Wisdom", value: data.wisdom, ref:{resource:"abilityScores",index:"wis"}})
    details.push({label: "Speed", values:this.speed(data.speed)})
    details.push({label: "Senses", values:this.senses(data.senses)})
    details.push({label: "Proficiencies", values:data.proficiencies.map(p=>(
      {value:p.proficiency.name+" ("+p.value+")", ref:{resource:"proficiencies", index:p.proficiency.index}}
    ))})
    details.push({label: "Languages", value:data.languages})
    if(data.forms)
      details.push({label: "Forms", values:data.forms.map(f=>(
        {value:f.name, ref:{resource:"monsters", index:f.index}}
      ))})
    if(data.reactions)
      details.push({label: "Reations", values:data.reactions.map(r=>(
        {value:r.desc}
      ))})
    details.push({label: "Actions", values:data.actions.map(a=>(
      {value:a.name+": "+a.desc}
    ))})
    if(data.legendary_actions)
      details.push({label: "Legendary Actions", values:data.legendary_actions.map(a=>(
        {value:a.name+": "+a.desc}
      ))})
    if(data.special_abilities)
      details.push({label: "Special Abilities", values:data.special_abilities.map(a=>(
        {value:a.name+": "+a.desc}
      ))})
    details.push({label: "Condition Immunities", values:data.condition_immunities.map(c=>(
      {value:c.name,ref:{resource:"conditions",index:c.index}}
    ))})
    details.push({label: "Damage Immunities", values:data.damage_immunities.map(d=>(
      {value:d}
    ))})
    details.push({label: "Damage Resistances", values:data.damage_resistances.map(d=>(
      {value:d}
    ))})
    details.push({label: "Damage Vulnerabilities", values:data.damage_vulnerabilities.map(d=>(
      {value:d}
    ))})

    return details;
  }
}