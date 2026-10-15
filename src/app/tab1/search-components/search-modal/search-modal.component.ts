import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
})
export class SearchModalComponent implements OnInit {
  titles: {[key: string]: string} = {
    ["abilityScores"]       : "Ability Scores",
    ["alignments"]          : "Alignments",
    ["backgrounds"]         : "Backgrounds",
    ["classes"]             : "Classes",
    ["conditions"]          : "Conditions",
    ["damageTypes"]         : "Damage-Types",
    ["equipments"]          : "Equipment",
    ["equipmentCategories"] : "Equipment-Categories",
    ["feats"]               : "Feats",
    ["features"]            : "Features",
    ["languages"]           : "Languages",
    ["levels"]              : "Levels",
    ["magicItems"]          : "Magic Items",
    ["magicSchools"]        : "Magic Schools",
    ["monsters"]            : "Monsters",
    ["proficiencies"]       : "Proficiencies",
    ["races"]               : "Races",
    ["rules"]               : "Rules",
    ["ruleSections"]        : "Rule-Sections",
    ["skills"]              : "Skills",
    ["spells"]              : "Spells",
    ["subclasses"]          : "Subclasses",
    ["subraces"]            : "Subraces",
    ["traits"]              : "Traits",
    ["weaponProperties"]    : "Weapon-Properties",
  }

  @Input()
  resource: undefined | string;

  @Input()
  fnCanConfirm: undefined | ((resource: string, index: string) => boolean);

  constructor(private modalCtrl: ModalController) {}

  onCloseClick(){
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  onSubmitEvent(data: any){
    return this.modalCtrl.dismiss(data, 'confirm')
  }

  ngOnInit() {}

}
