import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss'],
})
export class DetailsModalComponent implements OnInit {

  titles: {[key: string]: string} = {
    ["abilityScores"]       : "Ability Score",
    ["alignments"]          : "Alignment",
    ["backgrounds"]         : "Background",
    ["classes"]             : "Class",
    ["conditions"]          : "Condition",
    ["damageTypes"]         : "Damage-Type",
    ["equipments"]          : "Equipment",
    ["equipmentCategories"] : "Equipment-Category",
    ["feats"]               : "Feat",
    ["features"]            : "Feature",
    ["languages"]           : "Language",
    ["levels"]              : "Level",
    ["magicItems"]          : "Magic Item",
    ["magicSchools"]        : "Magic School",
    ["monsters"]            : "Monster",
    ["proficiencies"]       : "Proficiency",
    ["races"]               : "Race",
    ["rules"]               : "Rule",
    ["ruleSections"]        : "Rule-Section",
    ["skills"]              : "Skill",
    ["spells"]              : "Spell",
    ["subclasses"]          : "Subclass",
    ["subraces"]            : "Subrace",
    ["traits"]              : "Trait",
    ["weaponProperties"]    : "Weapon-Property",
  }

  @Input()
  resource: undefined | string;

  @Input()
  index: undefined | string;

  @Input()
  fnCanConfirm: undefined | ((resource: string, index: string) => boolean);

  constructor(private modalCtrl: ModalController) {}

  shouldShowConfim(){
    return this.fnCanConfirm && this.resource && this.index && this.fnCanConfirm(this.resource, this.index);
  }

  onCloseClick(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onSubmitClick(){
    if(!this.shouldShowConfim())
      return;
    this.modalCtrl.dismiss({resource: this.resource, index: this.index}, 'confirm')
  }

  onSubmitEvent(data: any){
    this.modalCtrl.dismiss(data, 'confirm')
  }

  ngOnInit() {}

}
