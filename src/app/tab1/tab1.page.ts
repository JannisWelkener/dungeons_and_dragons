import { Component } from '@angular/core'
import { SelectCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor() {}

  resource: string | undefined;

  ngOnInit() {
  }

  resources(): {index: string, title: string}[]{
    return [
      {index: "abilityScores",       title: "Ability Scores"},
      {index: "alignments",          title: "Alignments"},
      {index: "backgrounds",         title: "Backgrounds"},
      {index: "classes",             title: "Classes"},
      {index: "conditions",          title: "Conditions"},
      {index: "damageTypes",         title: "Damage-Types"},
      {index: "equipments",          title: "Equipments"},
      {index: "equipmentCategories", title: "Equipment-Categories"},
      {index: "feats",               title: "Feats"},
      {index: "features",            title: "Features"},
      {index: "languages",           title: "Languages"},
      {index: "levels",              title: "Levels"},
      {index: "magicItems",          title: "Magic Items"},
      {index: "magicSchools",        title: "Magic Schools"},
      {index: "monsters",            title: "Monsters"},
      {index: "proficiencies",       title: "Proficiencies"},
      {index: "races",               title: "Races"},
      {index: "rules",               title: "Rules"},
      {index: "ruleSections",        title: "RuleSections"},
      {index: "skills",              title: "Skills"},
      {index: "spells",              title: "Spells"},
      {index: "subclasses",          title: "Subclasses"},
      {index: "subraces",            title: "Subraces"},
      {index: "traits",              title: "Traits"},
      {index: "weaponProperties",    title: "WeaponProperties"},
    ]
  }

  onSelectChanged(event: any){
    this.resource = (event as SelectCustomEvent<string>).detail.value
  }

}
