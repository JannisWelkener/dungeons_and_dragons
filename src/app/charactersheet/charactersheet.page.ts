import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApolloGraphqlService } from '../api/apollo-graphql.service';
import { CharactersService, InventoryItem } from '../service/characters.service';
import { SearchModalComponent } from '../tab1/search-components/search-modal/search-modal.component';
import { InventoryComponent, InventoryEvent } from './inventory/inventory.component';


@Component({
  selector: 'app-charactersheet',
  templateUrl: './charactersheet.page.html',
  styleUrls: ['./charactersheet.page.scss'],
})
export class CharactersheetPage implements OnInit {

  @ViewChild(InventoryComponent, {static:false})
  inventory: InventoryComponent | undefined


  allSkills: { index: string; name: string; ability_score: {name:string};}[] | undefined;
  allAlignments:any=[];
  allLanguages:any=[];

  unlockedLevels:any = [];

  constructor(public characters:CharactersService,private dndService: ApolloGraphqlService, private changeDetector: ChangeDetectorRef) { }

  selected_segment:string='background';

  displayed_hp:number=0.5;

  currentHP():number{
    return this.characters.selected_character!.currentHP / (this.characters.selected_character!.maxHP + this.characters.selected_character!.tempHP);
  }
  tempHP():number{
    return (this.characters.selected_character!.currentHP+this.characters.selected_character!.tempHP) / (this.characters.selected_character!.maxHP + this.characters.selected_character!.tempHP);
  }

  changeMaxHP(event:any){
    this.characters.selected_character!.maxHP = event.target.value * 1.0;
    this.characters.save_to_localstorage();
  }
  changeHP(event:any){
    this.characters.selected_character!.currentHP = event.target.value * 1.0;
    this.characters.save_to_localstorage();
  }
  changeTempHP(event:any){
    this.characters.selected_character!.tempHP = event.target.value * 1.0;
    this.characters.save_to_localstorage();
  }

  changeXP(event:any){
    this.characters.selected_character!.xp = event.target.value * 1.0;
    this.characters.save_to_localstorage();
  }

  xp_calc(){
    var lvl = this.calc_level();
    this.characters.selected_character!.level = lvl;
    var xp_diff = this.get_XP_diff_between_lvls(lvl,this.characters.selected_character!.xp);
    return xp_diff;
  }

  get_XP_diff_between_lvls(lvl:number,currXP:number){
    switch (lvl){
      case 1:{
        return currXP/300;
      }
      case 2:{
        return (currXP-300)/(900-300);
      }
      case 3:{
        return (currXP-900)/(2700-900);
      }
      case 4:{
        return (currXP-2700)/(6500-2700);
      }
      case 5:{
        return (this.characters.selected_character!.xp-6500)/(14000-6500);
      }
      case 6:{
        return (this.characters.selected_character!.xp-14000)/(23000-14000);
      }
      case 7:{
        return (this.characters.selected_character!.xp-23000)/(34000-23000);
      }
      case 8:{
        return (this.characters.selected_character!.xp-34000)/(48000-34000);
      }
      case 9:{
        return (this.characters.selected_character!.xp-48000)/(64000-48000);
      }
      case 10:{
        return (this.characters.selected_character!.xp-64000)/(85000-64000);
      }
      case 11:{
        return (this.characters.selected_character!.xp-85000)/(100000-85000);
      }
      case 12:{
        return (this.characters.selected_character!.xp-100000)/(120000-100000);
      }
      case 13:{
        return (this.characters.selected_character!.xp-120000)/(140000-120000);
      }
      case 14:{
        return (this.characters.selected_character!.xp-140000)/(165000-140000);
      }
      case 15:{
        return (this.characters.selected_character!.xp-165000)/(195000-165000);
      }
      case 16:{
        return (this.characters.selected_character!.xp-195000)/(225000-195000);
      }
      case 17:{
        return (this.characters.selected_character!.xp-225000)/(265000-225000);
      }
      case 18:{
        return (this.characters.selected_character!.xp-265000)/(305000-265000);
      }
      case 19:{
        return (this.characters.selected_character!.xp-305000)/(355000-305000);
      }
      default:{
        return 0.01;
      }


    }
  }

  calc_level(){
    if(this.characters.selected_character!.xp < 300)return 1;
    if(this.characters.selected_character!.xp < 900)return 2;
    if(this.characters.selected_character!.xp < 2700)return 3;
    if(this.characters.selected_character!.xp < 6500)return 4;
    if(this.characters.selected_character!.xp < 14000)return 5;
    if(this.characters.selected_character!.xp < 23000)return 6;
    if(this.characters.selected_character!.xp < 34000)return 7;
    if(this.characters.selected_character!.xp < 48000)return 8;
    if(this.characters.selected_character!.xp < 64000)return 9;
    if(this.characters.selected_character!.xp < 85000)return 10;
    if(this.characters.selected_character!.xp < 100000)return 11;
    if(this.characters.selected_character!.xp < 120000)return 12;
    if(this.characters.selected_character!.xp < 140000)return 13;
    if(this.characters.selected_character!.xp < 165000)return 14;
    if(this.characters.selected_character!.xp < 195000)return 15;
    if(this.characters.selected_character!.xp < 225000)return 16;
    if(this.characters.selected_character!.xp < 265000)return 17;
    if(this.characters.selected_character!.xp < 305000)return 18;
    if(this.characters.selected_character!.xp < 355000)return 19;
    return 20;
  }


  ngOnInit() {
    //this.characters.load_from_localstorage();

    var query = this.dndService.getAllSkills()
    query.valueChanges.subscribe((result) => {
      let data = result.data || {classes: []};
      this.allSkills = result.data?.skills;
    });

    this.loadLvls();
    this.loadAlignments();
    this.loadLanguages();
  }

  loadLvls(){
    var error = false;
    var loading = true;

    var term = this.characters.selected_character?.class_type.index;

    this.dndService.level_search(term as any, (result) => {
      loading = result.loading;
      error = result.error != undefined;

      this.unlockedLevels = result.data.levels.map((level) => {
        let [title, details] = [level.class.name, ""]
        if(level.subclass){
          title = level.subclass.name
          details = level.class.name
        }

        return {
          identifier: level.index,

          title: title+": Level "+level.level,
          details: details,
          level_num: level.level,
          description: level.features.map(f=>f.name).join(", ")
        }
      })
    });
  }

  loadAlignments(){
    this.dndService.alignment_search("", (result) => {
        this.allAlignments = result.data.alignments.map((alignment) => {
        return {
          identifier: alignment.index,
          title: alignment.name,
          details: alignment.abbreviation,
          description: alignment.desc
        }
      })
    });
  }

  loadLanguages(){
    this.dndService.language_search("", (result) => {

      this.allLanguages = result.data.languages.map((language) => {
        return {
          identifier: language.index,
          title: language.name,
          details: language.type,
          description: language.desc || ""
        }
      })
    });
  }


  onSelectChangedAlignment(event: any){
    this.characters.selected_character!.alignment = event.target.value;
    this.characters.save_to_localstorage();
  }

  onSelectChangedLanguage(event: any,i:number){
    this.characters.selected_character!.languages[i] = event.target.checked;
    this.characters.save_to_localstorage();
  }

  onSelectChangedSkillPoint(event: any,i:number){
    this.characters.selected_character!.skill_points[i] = event.target.value;
    this.characters.save_to_localstorage();
  }
  onSelectChangedSkillPointCheckmark(event: any,i:number){
    this.characters.selected_character!.skill_points_checked[i] = event.target.checked;
    this.characters.save_to_localstorage();
  }

  onSelectChangedDSS(event: any,i:number){
    this.characters.selected_character!.death_saves_success[i] = event.target.checked;
    this.characters.save_to_localstorage();
  }

  onSelectChangedDSF(event: any,i:number){
    this.characters.selected_character!.death_saves_failure[i] = event.target.checked;
    this.characters.save_to_localstorage();
  }

  onSelectChangedPersonality(event: any){
    this.characters.selected_character!.personality = event.target.value;
    this.characters.save_to_localstorage();
  }
  onSelectChangedIdeals(event: any){
    this.characters.selected_character!.ideals = event.target.value;
    this.characters.save_to_localstorage();
  }
  onSelectChangedBonds(event: any){
    this.characters.selected_character!.bonds = event.target.value;
    this.characters.save_to_localstorage();
  }
  onSelectChangedFlaws(event: any){
    this.characters.selected_character!.flaws = event.target.value;
    this.characters.save_to_localstorage();
  }

  changeArmorClass(event: any){
    this.characters.selected_character!.armor_class = event.target.value;
    this.characters.save_to_localstorage();
  }

  changeInitiative(event: any){
    this.characters.selected_character!.initiative = event.target.value;
    this.characters.save_to_localstorage();
  }

  changeSpeed(event: any){
    this.characters.selected_character!.speed = event.target.value;
    this.characters.save_to_localstorage();
  }

  changePassiveWisdom(event: any){
    this.characters.selected_character!.passiv_wisdom = event.target.value;
    this.characters.save_to_localstorage();
  }

  changeInspiration(event: any){
    this.characters.selected_character!.inspiration = event.target.value;
    this.characters.save_to_localstorage();
  }

  changeProficiencyBonus(event: any){
    this.characters.selected_character!.proficiency_bonus = event.target.value;
    this.characters.save_to_localstorage();
  }

  onSelectChangedSTC(event: any,i:number){
    this.characters.selected_character!.saving_throws_checked[i] = event.target.checked;
    this.characters.save_to_localstorage();
  }

  onSelectChangedSTN(event: any,i:number){
    this.characters.selected_character!.saving_throws[i] = event.target.value;
    this.characters.save_to_localstorage();
  }


  onSelectChangedAttr(event: any,i:number){
    switch(i){
      case 0:{
        this.characters.selected_character!.strength.attr = event.target.value;
        break;
      }
      case 1:{
        this.characters.selected_character!.dexterity.attr = event.target.value;
        break;
      }
      case 2:{
        this.characters.selected_character!.constitution.attr = event.target.value;
        break;
      }
      case 3:{
        this.characters.selected_character!.intelligence.attr = event.target.value;
        break;
      }
      case 4:{
        this.characters.selected_character!.wisdom.attr = event.target.value;
        break;
      }
      case 5:{
        this.characters.selected_character!.charisma.attr = event.target.value;
        break;
      }
    }
    this.characters.save_to_localstorage();
  }

  onSelectChangedSubAttr(event: any,i:number){
    switch(i){
      case 0:{
        this.characters.selected_character!.strength.sub_attr = event.target.value;
        break;
      }
      case 1:{
        this.characters.selected_character!.dexterity.sub_attr = event.target.value;
        break;
      }
      case 2:{
        this.characters.selected_character!.constitution.sub_attr = event.target.value;
        break;
      }
      case 3:{
        this.characters.selected_character!.intelligence.sub_attr = event.target.value;
        break;
      }
      case 4:{
        this.characters.selected_character!.wisdom.sub_attr = event.target.value;
        break;
      }
      case 5:{
        this.characters.selected_character!.charisma.sub_attr = event.target.value;
        break;
      }
    }
    this.characters.save_to_localstorage();
  }

  getInventory(){
    return this.characters.selected_character?.inventory;
  }

  private addInventoryItem(item: InventoryItem){
    let inventory = this.getInventory();
    if(!inventory)
      return;

    //set identifier as 'biggest identifier in array'+1 (lowest identifier: 1)
    item.identifier = inventory.reduce((prev, itemB) => Math.max(prev, itemB.identifier), 0)+1
    inventory.push(item);
  }
  private removeInventoryItem(item: InventoryItem){
    let inventory = this.getInventory();
    if(!inventory)
      return;

    let itemIndex = inventory.findIndex(i => i.identifier == item.identifier)
    if(itemIndex < 0)
      return;
    inventory.splice(itemIndex, 1); //remove the one item at index...

  }
  private increaseInventoryItem(item: InventoryItem){
    let inventory = this.getInventory();
    if(!inventory)
      return;

    let ref = inventory.find(i => i.identifier == item.identifier)
    if(!ref)
      return;
    ref.count++;
    return;

  }
  private decreaseInventoryItem(item: InventoryItem){
    let inventory = this.getInventory();
    if(!inventory)
      return;

    let ref = inventory.find(i => i.identifier == item.identifier)
    if(!ref)
      return;
    if(ref.count <= 1){ //remove instead!
      return this.removeInventoryItem(ref);
    }
    ref.count--;
    return;

  }


  onInventoryEvent(event: InventoryEvent){
    if(event.type == "add")
      this.addInventoryItem(event.item);
    else if(event.type == "remove")
      this.removeInventoryItem(event.item);
    else if(event.type == "increase")
      this.increaseInventoryItem(event.item);
    else if(event.type == "decrease")
      this.decreaseInventoryItem(event.item);

    this.inventory?.update();
    this.characters.save_to_localstorage();
  }
}
