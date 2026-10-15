import { EventEmitter } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { DetailsModalComponent } from "../details-modal/details-modal.component";

const resources = [
  "abilityScores", "alignments", "backgrounds", "classes", "conditions", "damageTypes", "equipments", "equipmentCategories",
  "feats", "features", "languages", "levels", "magicItems", "magicSchools", "monsters", "proficiencies", "races", "rules",
  "ruleSections", "skills", "spells", "subclasses", "subraces", "traits", "weaponProperties", "details",
 ];
function isResource(val: string): boolean {
  return resources.includes(val)
}

export abstract class CommonDetailsComponent {
  abstract title: string;

  details: undefined | {
    label: string,
    value?: undefined | string | number | boolean,
    values?: undefined | {
      value: string
      ref?: undefined | {resource: string, index: string}
    }[]
    ref?: undefined | {resource: string, index: string}
    special?: "image"
  }[];

  error: boolean = false;
  loading: boolean = false;

  abstract confirm: EventEmitter<{resource: string, index: string}>;
  abstract fnCanConfirm: undefined | ((resource: string, index: string) => boolean);

  constructor(private modalCtrl: ModalController) {}

  onCloseClick(){
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  onReferenceClick(ref: undefined | {resource: string, index: string}){
    if(ref && isResource(ref.resource)){
      this.modalCtrl.create({
        component: DetailsModalComponent,
        componentProps: {resource: ref.resource, index: ref.index, fnCanConfirm: this.fnCanConfirm}
      })
      .then((modal) => {
        modal.present()
        return modal.onDidDismiss();
      }).then(detail => {
        if(detail.role == 'confirm')
          this.confirm.emit(detail.data);
      });
    }
  }
}
