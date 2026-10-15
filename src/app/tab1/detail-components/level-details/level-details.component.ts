import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApolloGraphqlService } from '../../../api/apollo-graphql.service';
import { Level_Detailed } from '../../../api/queries/level';
import { CommonDetailsComponent } from '../common-details/common-details.component';

@Component({
  selector: 'app-level-details',
  templateUrl: '../common-details/common-details.component.html',
  styleUrls: ['../common-details/common-details.component.scss'],
})
export class LevelDetailsComponent extends CommonDetailsComponent implements OnInit {
  @Output()
  confirm = new EventEmitter<{resource: string, index: string}>();
  @Input()
  index: string | undefined
  @Input()
  fnCanConfirm: ((resource: string, index: string) => boolean) | undefined;
  title: string = "Level";

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
      this.apollo_system.level_detail(this.index, result => {
        this.loading = result.loading;
        this.error = result.loading == undefined;
        this.details = undefined;
        if(result.data.level != undefined)
          this.details = this.convert(result.data.level);
      });
    }
  }

  private spellcasting(s: {
    cantrips_known: undefined | number
    spell_slots_level_1: undefined | number
    spell_slots_level_2: undefined | number
    spell_slots_level_3: undefined | number
    spell_slots_level_4: undefined | number
    spell_slots_level_5: undefined | number
    spell_slots_level_6: undefined | number
    spell_slots_level_7: undefined | number
    spell_slots_level_8: undefined | number
    spell_slots_level_9: undefined | number
    spells_known: undefined | number
  }): {value:string}[] {
    let arr: {value:string}[] = [];
    if(s.cantrips_known)
      arr.push({value:"Cantrips: "+s.cantrips_known})
    if(s.spells_known)
      arr.push({value:"Spells: "+s.spells_known})
    if(s.spell_slots_level_1)
      arr.push({value:"Slot 1: "+s.spell_slots_level_1})
    if(s.spell_slots_level_2)
      arr.push({value:"Slot 2: "+s.spell_slots_level_2})
    if(s.spell_slots_level_3)
      arr.push({value:"Slot 3: "+s.spell_slots_level_1})
    if(s.spell_slots_level_4)
      arr.push({value:"Slot 4: "+s.spell_slots_level_1})
    if(s.spell_slots_level_5)
      arr.push({value:"Slot 5: "+s.spell_slots_level_1})
    if(s.spell_slots_level_6)
      arr.push({value:"Slot 6: "+s.spell_slots_level_1})
    if(s.spell_slots_level_7)
      arr.push({value:"Slot 7: "+s.spell_slots_level_1})
    if(s.spell_slots_level_8)
      arr.push({value:"Slot 8: "+s.spell_slots_level_1})
    if(s.spell_slots_level_9)
      arr.push({value:"Slot 9: "+s.spell_slots_level_1})

    return arr;
  }

  convert(data: Level_Detailed){
    let details: typeof this.details = []

    details.push({label: "Class", value: data.class.name, ref:{resource:"classes",index:data.class.index}})
    if(data.subclass)
      details.push({label: "Subclass", value: data.subclass.name, ref:{resource:"subclasses",index:data.subclass.index}})
    details.push({label: "Level", value: data.level})
    if(data.ability_score_bonuses)
      details.push({label: "Ability Score Bonus", value: data.ability_score_bonuses})
    if(data.prof_bonus)
      details.push({label: "Proficiency Bonus", value: data.prof_bonus})
    if(data.spellcasting)
      details.push({label: "Spellcasting", values:this.spellcasting(data.spellcasting)})
    details.push({label:"Features",values:data.features.map(f=>(
      {value:f.name, ref:{resource:"features", index:f.index}}
    ))})
    if(data.class_specific && data.class_specific.brutal_critical_dice)
      details.push({label: "Brutal Critical Dice", value: data.class_specific.brutal_critical_dice})
    if(data.class_specific && data.class_specific.rage_count)
      details.push({label: "Rage Count", value: data.class_specific.rage_count})
    if(data.class_specific && data.class_specific.rage_damage_bonus)
      details.push({label: "Rage Damage Bonus", value: data.class_specific.rage_damage_bonus})

    if(data.class_specific && data.class_specific.bardic_inspiration_die)
      details.push({label: "Bardic Inspiration Die", value: data.class_specific.bardic_inspiration_die})
    if(data.class_specific && data.class_specific.song_of_rest_die)
      details.push({label: "Song of Rest Die", value: data.class_specific.song_of_rest_die})
    if(data.class_specific && data.class_specific.magical_secrets_max_5)
      details.push({label: "Magical Secrets (5)", value: data.class_specific.magical_secrets_max_5})
    if(data.class_specific && data.class_specific.magical_secrets_max_7)
      details.push({label: "Magical Secrets (7)", value: data.class_specific.magical_secrets_max_7})
    if(data.class_specific && data.class_specific.magical_secrets_max_9)
      details.push({label: "Magical Secrets (9)", value: data.class_specific.magical_secrets_max_9})

    if(data.class_specific && data.class_specific.channel_divinity_charges)
      details.push({label: "Channel Divinity Charges", value: data.class_specific.channel_divinity_charges})
    if(data.class_specific && data.class_specific.destroy_undead_cr)
      details.push({label: "Destroy Undead CR", value: data.class_specific.destroy_undead_cr})

    if(data.class_specific && data.class_specific.wild_shape_fly != undefined)
      details.push({label: "Wild Shape Fly", value: data.class_specific.wild_shape_fly})
    if(data.class_specific && data.class_specific.wild_shape_swim != undefined)
      details.push({label: "Wild Shape Swim", value: data.class_specific.wild_shape_swim})
    if(data.class_specific && data.class_specific.wild_shape_max_cr)
      details.push({label: "Wild Shape max CR", value: data.class_specific.wild_shape_max_cr})

    if(data.class_specific && data.class_specific.action_surges)
      details.push({label: "Action Surges", value: data.class_specific.action_surges})
    if(data.class_specific && data.class_specific.extra_attacks)
      details.push({label: "Extra Attacks", value: data.class_specific.extra_attacks})
    if(data.class_specific && data.class_specific.indomitable_uses)
      details.push({label: "Indomitable Uses", value: data.class_specific.indomitable_uses})

    if(data.class_specific && data.class_specific.ki_points)
      details.push({label: "KI Points", value: data.class_specific.ki_points})
    if(data.class_specific && data.class_specific.unarmored_movement)
      details.push({label: "Unarmored Movement", value: data.class_specific.unarmored_movement})
    if(data.class_specific && data.class_specific.martial_arts)
      details.push({label: "Martial Arts",
        value: data.class_specific.martial_arts.dice_count+"d"+data.class_specific.martial_arts.dice_value
      })

    if(data.class_specific && data.class_specific.aura_range)
      details.push({label: "Aura Range", value: data.class_specific.aura_range})

    if(data.class_specific && data.class_specific.favored_enemies)
      details.push({label: "Favored Enemies", value: data.class_specific.favored_enemies})
    if(data.class_specific && data.class_specific.favored_terrain)
      details.push({label: "Favored Terrain", value: data.class_specific.favored_terrain})

    if(data.class_specific && data.class_specific.sneak_attack)
      details.push({label: "Sneak Attack",
        value: data.class_specific.sneak_attack.dice_count+"d"+data.class_specific.sneak_attack.dice_value
      })

    if(data.class_specific && data.class_specific.metamagic_known)
      details.push({label: "Metamagic Known", value: data.class_specific.metamagic_known})
    if(data.class_specific && data.class_specific.sorcery_points)
      details.push({label: "Sorcery Points", value: data.class_specific.sorcery_points})
    if(data.class_specific && data.class_specific.creating_spell_slots)
      details.push({label: "Creating Spell Slots", values: data.class_specific.creating_spell_slots.map(c=>(
        {value:"Level: "+c.spell_slot_level+", Sorcery Point Cost: "+c.sorcery_point_cost}
      ))})

    if(data.class_specific && data.class_specific.invocations_known)
      details.push({label: "Invocations Known", value: data.class_specific.invocations_known})
    if(data.class_specific && data.class_specific.mystic_arcanum_level_6)
      details.push({label: "Mystic Arcanum (Level 6)", value: data.class_specific.mystic_arcanum_level_6})
    if(data.class_specific && data.class_specific.mystic_arcanum_level_7)
      details.push({label: "Mystic Arcanum (Level 7)", value: data.class_specific.mystic_arcanum_level_7})
    if(data.class_specific && data.class_specific.mystic_arcanum_level_8)
      details.push({label: "Mystic Arcanum (Level 8)", value: data.class_specific.mystic_arcanum_level_8})
    if(data.class_specific && data.class_specific.mystic_arcanum_level_9)
      details.push({label: "Mystic Arcanum (Level 9)", value: data.class_specific.mystic_arcanum_level_9})

    if(data.class_specific && data.class_specific.arcane_recovery_levels)
      details.push({label: "Arcane Recovery Levels", value: data.class_specific.arcane_recovery_levels})

    if(data.subclass_specific && data.subclass_specific.aura_range)
      details.push({label: "Aura Range", value: data.subclass_specific.aura_range})

    if(data.subclass_specific && data.subclass_specific.additional_magical_secrets_max_lvl)
      details.push({label: "Additional Magical Secrets max Level", value: data.subclass_specific.additional_magical_secrets_max_lvl})

    return details;
  }

}