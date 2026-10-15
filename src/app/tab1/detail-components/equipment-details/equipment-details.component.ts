import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApolloGraphqlService } from '../../../api/apollo-graphql.service';
import { Equipment_Detailed } from '../../../api/queries/equipment';
import { CommonDetailsComponent } from '../common-details/common-details.component';

@Component({
  selector: 'app-equipment-details',
  templateUrl: '../common-details/common-details.component.html',
  styleUrls: ['../common-details/common-details.component.scss'],
})
export class EquipmentDetailsComponent extends CommonDetailsComponent implements OnInit {
  @Output()
  confirm = new EventEmitter<{resource: string, index: string}>();
  @Input()
  index: string | undefined
  @Input()
  fnCanConfirm: ((resource: string, index: string) => boolean) | undefined;
  title: string = "Equipment";

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
      this.apollo_system.equipment_detail(this.index, result => {
        this.loading = result.loading;
        this.error = result.loading == undefined;
        this.details = undefined;
        if(result.data.equipment != undefined)
          this.details = this.convert(result.data.equipment);
      });
    }
  }

  convert(data: Equipment_Detailed){
    let details: typeof this.details = []

    details.push({label: "Name", value: data.name})
    details.push({label: "Equipment Category", value: data.equipment_category.name,
      ref:{resource:"equipmentCategories", index:data.equipment_category.index}})
    if(data.tool_category)
      details.push({label: "Tool Category", value: data.tool_category.name,
        ref:{resource:"equipmentCategories", index:data.tool_category.index}})
    if(data.gear_category)
      details.push({label: "Tool Category", value: data.gear_category.name,
        ref:{resource:"equipmentCategories", index:data.gear_category.index}})
    if(data.weapon_category)
      details.push({label: "Weapon Category", value: data.weapon_category.name,
        ref:{resource:"equipmentCategories", index:data.weapon_category.index}})
    if(data.category_range)
      details.push({label: "Range Category", value: data.category_range.name,
        ref:{resource:"equipmentCategories", index:data.category_range.index}})
    if(data.vehicle_category)
      details.push({label: "Vehicle Category", value: data.vehicle_category.name,
        ref:{resource:"equipmentCategories", index:data.vehicle_category.index}})
    if(data.desc)
      details.push({label: "Description", values: data.desc.map(d=>(
        {value: d}
      ))})
    details.push({label:"Weight", value:data.weight})
    if(data.quantity)
      details.push({label:"Quantity", value:data.quantity})
    if(data.weapon_range)
      details.push({label:"Weapon Range", value:data.weapon_range})
    if(data.special)
      details.push({label: "Special", values: data.special.map(s=>(
        {value: s}
      ))})
    if(data.stealth_disadvantage != undefined) //false != undefined
      details.push({label:"Stealth Disadvantage", value:data.stealth_disadvantage})
    if(data.str_minimum)
      details.push({label:"Strength Minimum", value:data.str_minimum})
    if(data.capacity)
      details.push({label:"Capacity", value:data.capacity})
    details.push({label:"Cost", value:data.cost.quantity + data.cost.unit})
    if(data.contents)
      details.push({label:"Contents", values:data.contents.map(c=>(
        {value:c.item.name+" ("+c.quantity+")", ref:{resource:"equipments",index:c.item.index}}
      ))})
    if(data.range)
      details.push({label:"Range", value:"Normal: "+data.range.normal+", Long: "+(data.range.long || 0)})
    if(data.throw_range)
      details.push({label:"Trow Range", value:"Normal: "+data.throw_range.normal+", Long: "+(data.throw_range.long || 0)})
    if(data.properties)
      details.push({label:"Properties", values:data.properties.map(p=>(
        {value:p.name, ref:{resource:"weaponProperties", index:p.index}}
      ))})
    if(data.damage)
      details.push({label: "Damage",
        value: data.damage.damage_dice+", "+data.damage.damage_type.name,
        ref:{resource:"damageTypes", index: data.damage.damage_type.index}})
    if(data.two_handed_damage)
      details.push({label: "Two-Handed Damage",
        value: data.two_handed_damage.damage_dice+", "+data.two_handed_damage.damage_type.name,
        ref:{resource:"damageTypes", index: data.two_handed_damage.damage_type.index}})
    if(data.armor_class)
      details.push({label:"Armor Class",
      value: data.armor_class.base
        + ((data.armor_class.dex_bonus)?"(+DEX"
          + ((data.armor_class.max_bonus)?", Max. "+data.armor_class.max_bonus:"")
          +")"
        :"")
        })
    if(data.speed)
      details.push({label:"Speed", value:data.speed.quantity+" "+data.speed.unit})

    return details;
  }

}