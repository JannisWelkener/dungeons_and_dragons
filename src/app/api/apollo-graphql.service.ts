import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { AbilityScoreQuery, AbilityScore_Detailed, AbilityScore_Short } from './queries/abilityScore';
import { AlignmentQuery, Alignment_Detailed, Alignment_Short } from './queries/alignment';
import { BackgroundQuery, Background_Detailed, Background_Short } from './queries/background';
import { ClassQuery, Class_Detailed, Class_Short } from './queries/class';
import { ConditionQuery, Condition_Detailed, Condition_Short } from './queries/condition';
import { DamageTypeQuery, DamageType_Detailed, DamageType_Short } from './queries/damageType';
import { EquipmentQuery, Equipment_Detailed, Equipment_Short } from './queries/equipment';
import { EquipmentCategoryQuery, EquipmentCategory_Detailed, EquipmentCategory_Short } from './queries/equipmentCategory';
import { FeatQuery, Feat_Detailed, Feat_Short } from './queries/feat';
import { FeatureQuery, Feature_Detailed, Feature_Short } from './queries/feature';
import { LanguageQuery, Language_Detailed, Language_Short } from './queries/language';
import { LevelQuery, Level_Detailed, Level_Short } from './queries/level';
import { MagicItemQuery, MagicItem_Detailed, MagicItem_Short } from './queries/magicItem';
import { MagicSchoolQuery, MagicSchool_Detailed, MagicSchool_Short } from './queries/magicSchool';
import { MonsterQuery, Monster_Detailed, Monster_Short } from './queries/monster';
import { ProficiencyQuery, Proficiency_Detailed, Proficiency_Short } from './queries/proficiency';
import { RaceQuery, Race_Detailed, Race_Short } from './queries/race';
import { RuleQuery, Rule_Detailed, Rule_Short } from './queries/rule';
import { RuleSectionQuery, RuleSection_Detailed, RuleSection_Short } from './queries/ruleSection';
import { SkillQuery, Skill_Detailed, Skill_Short } from './queries/skill';
import { SpellQuery, Spell_Detailed, Spell_Short } from './queries/spell';
import { SubclassQuery, Subclass_Detailed, Subclass_Short } from './queries/subclass';
import { SubraceQuery, Subrace_Detailed, Subrace_Short } from './queries/subrace';
import { TraitQuery, Trait_Detailed, Trait_Short } from './queries/trait';
import { WeaponPropertyQuery, WeaponProperty_Detailed, WeaponProperty_Short } from './queries/weaponProperty';

type clazz = "fighter" | "barbarian" | "paladin" | "monk" | "ranger" | "druid" | "sorcerer" | "rogue" | "warlock" | "bard" | "cleric" | "wizard"

@Injectable({
  providedIn: 'root',
})
export class ApolloGraphqlService {
  constructor(private apollo: Apollo) {}

  abilityScore_detail(index: string, sub: (result: ApolloQueryResult<{abilityScore: AbilityScore_Detailed | null}>) => void) {
    return this.apollo.watchQuery(AbilityScoreQuery.details(index))
      .valueChanges.subscribe(sub)
  }
  alignment_detail(index: string, sub: (result: ApolloQueryResult<{alignment: Alignment_Detailed | null}>) => void) {
    return this.apollo.watchQuery(AlignmentQuery.details(index))
      .valueChanges.subscribe(sub)
  }
  background_detail(index: string, sub: (result: ApolloQueryResult<{background: Background_Detailed | null}>) => void) {
    return this.apollo.watchQuery(BackgroundQuery.details(index))
      .valueChanges.subscribe(sub)
  }
  class_detail(index: string, sub: (result: ApolloQueryResult<{class: Class_Detailed | null}>) => void) {
    return this.apollo.watchQuery(ClassQuery.details(index))
      .valueChanges.subscribe(sub)
  }
  condition_detail(index: string, sub: (result: ApolloQueryResult<{condition: Condition_Detailed | null}>) => void) {
    return this.apollo.watchQuery(ConditionQuery.details(index))
      .valueChanges.subscribe(sub)
  }
  damageType_detail(index: string, sub: (result: ApolloQueryResult<{damageType: DamageType_Detailed | null}>) => void) {
    return this.apollo.watchQuery(DamageTypeQuery.details(index))
      .valueChanges.subscribe(sub)
  }
  equipment_detail(index: string, sub: (result: ApolloQueryResult<{equipment: Equipment_Detailed | null}>) => void) {
    return this.apollo.watchQuery(EquipmentQuery.details(index))
      .valueChanges.subscribe(sub)
  }
  equipmentCategory_detail(index: string, sub: (result: ApolloQueryResult<{equipmentCategory: EquipmentCategory_Detailed | null}>) => void) {
    return this.apollo.watchQuery(EquipmentCategoryQuery.details(index))
      .valueChanges.subscribe(sub)
  }
  feat_detail(index: string, sub: (result: ApolloQueryResult<{feat: Feat_Detailed | null}>) => void) {
    return this.apollo.watchQuery(FeatQuery.details(index))
      .valueChanges.subscribe(sub)
  }
  feature_detail(index: string, sub: (result: ApolloQueryResult<{feature: Feature_Detailed | null}>) => void) {
    return this.apollo.watchQuery(FeatureQuery.details(index))
      .valueChanges.subscribe(sub)
  }
  language_detail(index: string, sub: (result: ApolloQueryResult<{language: Language_Detailed | null}>) => void) {
    return this.apollo.watchQuery(LanguageQuery.details(index))
      .valueChanges.subscribe(sub)
  }
  level_detail(index: string, sub: (result: ApolloQueryResult<{level: Level_Detailed | null}>) => void) {
    return this.apollo.watchQuery(LevelQuery.details(index))
      .valueChanges.subscribe(sub)
  }
  magicItem_detail(index: string, sub: (result: ApolloQueryResult<{magicItem: MagicItem_Detailed | null}>) => void) {
    return this.apollo.watchQuery(MagicItemQuery.details(index))
      .valueChanges.subscribe(sub)
  }
  magicSchool_detail(index: string, sub: (result: ApolloQueryResult<{magicSchool: MagicSchool_Detailed | null}>) => void) {
    return this.apollo.watchQuery(MagicSchoolQuery.details(index))
      .valueChanges.subscribe(sub)
  }
  monster_detail(index: string, sub: (result: ApolloQueryResult<{monster: Monster_Detailed | null}>) => void) {
    return this.apollo.watchQuery(MonsterQuery.details(index))
      .valueChanges.subscribe(sub)
  }
  proficiency_detail(index: string, sub: (result: ApolloQueryResult<{proficiency: Proficiency_Detailed | null}>) => void) {
    return this.apollo.watchQuery(ProficiencyQuery.details(index))
      .valueChanges.subscribe(sub)
  }
  race_detail(index: string, sub: (result: ApolloQueryResult<{race: Race_Detailed | null}>) => void) {
    return this.apollo.watchQuery(RaceQuery.details(index))
      .valueChanges.subscribe(sub)
  }
  rule_detail(index: string, sub: (result: ApolloQueryResult<{rule: Rule_Detailed | null}>) => void) {
    return this.apollo.watchQuery(RuleQuery.details(index))
      .valueChanges.subscribe(sub)
  }
  ruleSection_detail(index: string, sub: (result: ApolloQueryResult<{ruleSection: RuleSection_Detailed | null}>) => void) {
    return this.apollo.watchQuery(RuleSectionQuery.details(index))
      .valueChanges.subscribe(sub)
  }
  skill_detail(index: string, sub: (result: ApolloQueryResult<{skill: Skill_Detailed | null}>) => void) {
    return this.apollo.watchQuery(SkillQuery.details(index))
      .valueChanges.subscribe(sub)
  }
  spell_detail(index: string, sub: (result: ApolloQueryResult<{spell: Spell_Detailed | null}>) => void) {
    return this.apollo.watchQuery(SpellQuery.details(index))
      .valueChanges.subscribe(sub)
  }
  subclass_detail(index: string, sub: (result: ApolloQueryResult<{subclass: Subclass_Detailed | null}>) => void) {
    return this.apollo.watchQuery(SubclassQuery.details(index))
      .valueChanges.subscribe(sub)
  }
  subrace_detail(index: string, sub: (result: ApolloQueryResult<{subrace: Subrace_Detailed | null}>) => void) {
    return this.apollo.watchQuery(SubraceQuery.details(index))
      .valueChanges.subscribe(sub)
  }
  trait_detail(index: string, sub: (result: ApolloQueryResult<{trait: Trait_Detailed | null}>) => void) {
    return this.apollo.watchQuery(TraitQuery.details(index))
      .valueChanges.subscribe(sub)
  }
  weaponProperty_detail(index: string, sub: (result: ApolloQueryResult<{weaponProperty: WeaponProperty_Detailed | null}>) => void) {
    return this.apollo.watchQuery(WeaponPropertyQuery.details(index))
      .valueChanges.subscribe(sub)
  }

  abilityScore_search(term: string, sub: (result: ApolloQueryResult<{abilityScores: AbilityScore_Short[]}>) => void) {
    return this.apollo.watchQuery(AbilityScoreQuery.search(term))
    .valueChanges.subscribe(sub)
  }
  alignment_search(term: string, sub: (result: ApolloQueryResult<{alignments: Alignment_Short[]}>) => void) {
    return this.apollo.watchQuery(AlignmentQuery.search(term))
    .valueChanges.subscribe(sub)
  }
  background_search(term: string, sub: (result: ApolloQueryResult<{backgrounds: Background_Short[]}>) => void) {
    return this.apollo.watchQuery(BackgroundQuery.search(term))
    .valueChanges.subscribe(sub)
  }
  class_search(term: string, sub: (result: ApolloQueryResult<{classes: Class_Short[]}>) => void) {
    return this.apollo.watchQuery(ClassQuery.search(term))
    .valueChanges.subscribe(sub)
  }
  condition_search(term: string, sub: (result: ApolloQueryResult<{conditions: Condition_Short[]}>) => void) {
    return this.apollo.watchQuery(ConditionQuery.search(term))
    .valueChanges.subscribe(sub)
  }
  damageType_search(term: string, sub: (result: ApolloQueryResult<{damageTypes: DamageType_Short[]}>) => void) {
    return this.apollo.watchQuery(DamageTypeQuery.search(term))
    .valueChanges.subscribe(sub)
  }
  equipment_search(term: string, sub: (result: ApolloQueryResult<{equipments: Equipment_Short[]}>) => void) {
    return this.apollo.watchQuery(EquipmentQuery.search(term))
    .valueChanges.subscribe(sub)
  }
  equipmentCategory_search(term: string, sub: (result: ApolloQueryResult<{equipmentCategories: EquipmentCategory_Short[]}>) => void) {
    return this.apollo.watchQuery(EquipmentCategoryQuery.search(term))
    .valueChanges.subscribe(sub)
  }
  feat_search(term: string, sub: (result: ApolloQueryResult<{feats: Feat_Short[]}>) => void) {
    return this.apollo.watchQuery(FeatQuery.search(term))
    .valueChanges.subscribe(sub)
  }
  feature_search(term: string, sub: (result: ApolloQueryResult<{features: Feature_Short[]}>) => void) {
    return this.apollo.watchQuery(FeatureQuery.search(term))
    .valueChanges.subscribe(sub)
  }
  language_search(term: string, sub: (result: ApolloQueryResult<{languages: Language_Short[]}>) => void) {
    return this.apollo.watchQuery(LanguageQuery.search(term))
    .valueChanges.subscribe(sub)
  }
  level_search(clazz: clazz, sub: (result: ApolloQueryResult<{levels: Level_Short[]}>) => void) {
    return this.apollo.watchQuery(LevelQuery.search(clazz))
    .valueChanges.subscribe(sub)
  }
  magicItem_search(term: string, sub: (result: ApolloQueryResult<{magicItems: MagicItem_Short[]}>) => void) {
    return this.apollo.watchQuery(MagicItemQuery.search(term))
    .valueChanges.subscribe(sub)
  }
  magicSchool_search(term: string, sub: (result: ApolloQueryResult<{magicSchools: MagicSchool_Short[]}>) => void) {
    return this.apollo.watchQuery(MagicSchoolQuery.search(term))
    .valueChanges.subscribe(sub)
  }
  monster_search(term: string, sub: (result: ApolloQueryResult<{monsters: Monster_Short[]}>) => void) {
    return this.apollo.watchQuery(MonsterQuery.search(term))
    .valueChanges.subscribe(sub)
  }
  proficiency_search(term: string, sub: (result: ApolloQueryResult<{proficiencies: Proficiency_Short[]}>) => void) {
    return this.apollo.watchQuery(ProficiencyQuery.search(term))
    .valueChanges.subscribe(sub)
  }
  race_search(term: string, sub: (result: ApolloQueryResult<{races: Race_Short[]}>) => void) {
    return this.apollo.watchQuery(RaceQuery.search(term))
    .valueChanges.subscribe(sub)
  }
  rule_search(term: string, sub: (result: ApolloQueryResult<{rules: Rule_Short[]}>) => void) {
    return this.apollo.watchQuery(RuleQuery.search(term))
    .valueChanges.subscribe(sub)
  }
  ruleSection_search(term: string, sub: (result: ApolloQueryResult<{ruleSections: RuleSection_Short[]}>) => void) {
    return this.apollo.watchQuery(RuleSectionQuery.search(term))
    .valueChanges.subscribe(sub)
  }
  skill_search(term: string, sub: (result: ApolloQueryResult<{skills: Skill_Short[]}>) => void) {
    return this.apollo.watchQuery(SkillQuery.search(term))
    .valueChanges.subscribe(sub)
  }
  spell_search(term: string, sub: (result: ApolloQueryResult<{spells: Spell_Short[]}>) => void) {
    return this.apollo.watchQuery(SpellQuery.search(term))
    .valueChanges.subscribe(sub)
  }
  subclass_search(term: string, sub: (result: ApolloQueryResult<{subclasses: Subclass_Short[]}>) => void) {
    return this.apollo.watchQuery(SubclassQuery.search(term))
    .valueChanges.subscribe(sub)
  }
  subrace_search(term: string, sub: (result: ApolloQueryResult<{subraces: Subrace_Short[]}>) => void) {
    return this.apollo.watchQuery(SubraceQuery.search(term))
    .valueChanges.subscribe(sub)
  }
  trait_search(term: string, sub: (result: ApolloQueryResult<{traits: Trait_Short[]}>) => void) {
    return this.apollo.watchQuery(TraitQuery.search(term))
    .valueChanges.subscribe(sub)
  }
  weaponProperty_search(term: string, sub: (result: ApolloQueryResult<{weaponProperties: WeaponProperty_Short[]}>) => void) {
    return this.apollo.watchQuery(WeaponPropertyQuery.search(term))
    .valueChanges.subscribe(sub)
  }

  equipment_short(index: string): Promise<Equipment_Short | null>{
    return new Promise((resolve, reject) => {
      this.apollo.watchQuery(EquipmentQuery.short(index))
        .valueChanges.subscribe(details => {
          if(details.data)
            return resolve(details.data.equipment)
          if(details.error)
            return reject(details.errors)
        })
    })
  }

  magicItem_short(index: string): Promise<MagicItem_Short | null>{
    return new Promise((resolve, reject) => {
      this.apollo.watchQuery(MagicItemQuery.short(index))
        .valueChanges.subscribe(details => {
          if(details.data)
            return resolve(details.data.magicItem)
          if(details.error)
            return reject(details.errors)
        })
    })
  }

  getAllClasses(){
    return this.apollo
      .watchQuery({
        query: gql`
          query search {
            classes{
              index
              name
            }
          }
        `
      }) as QueryRef<
        {
          classes: {
            index: string,
            name: string,
          }[]
        } | null>
  }

  getAllRaces(){
    return this.apollo
      .watchQuery({
        query: gql`
          query search {
            races{
              index
              name
            }
          }
        `
      }) as QueryRef<
        {
          races: {
            index: string,
            name: string,
          }[]
        } | null>
  }

  getAllSkills(){
    return this.apollo
      .watchQuery({
        query: gql`
          query search {
            skills{
              index
              name

              ability_score{
                name
              }

            }
          }
        `
      }) as QueryRef<
        {
          skills: {
            index: string,
            name: string,
            ability_score: {name:string}
          }[]
        } | null>
  }

  getClassInfo(term: string){
    return this.apollo
      .watchQuery({
        query: gql`
          query search($term: String!) {
            class(index: $term){
              index
              name

              hit_die
              starting_equipment_options{
                desc
                choose


                option_set{ //??????????
                  option_set_type
                  options{
                    option_type
                    items{
                      option_type
                      name
                    }
                  }
                }


              }
              starting_equipment{
                equipment{
                  index
                  name
                }
              }

            }
          }
        `,
        variables: {
          term: term,
        }
      }) as QueryRef<
        {
          class: {
            index: string,
            name: string,
            hit_die: number
            starting_equipment_options:{desc:string}[]
            starting_equipment:{equipment:{index:string}}[]
          }
        } | null, { term: string }>
  }

}
