import { Injectable } from '@angular/core';

type InventoryItem = {
  identifier: any,
  resource: string,
  index: string,
  count: number
}
export type {InventoryItem}

export class DnDCharacter{
  name:string=""
  class_type!: {
    index: string;
    title: string;
  };
  race:string=""
  level:number=1

  currentHP:number=100
  maxHP:number=100
  tempHP:number=0;

  equipment:string[]=[]
  skill_points:string[]=[]
  skill_points_checked:boolean[]=[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]

  languages:boolean[]=[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]

  alignment:string="Neutral"

  personality:string=""
  ideals:string=""
  bonds:string=""
  flaws:string=""

  armor_class:string=""
  initiative:string=""
  speed:string=""

  strength:{attr:string,sub_attr:string}={attr:"",sub_attr:""}
  dexterity:{attr:string,sub_attr:string}={attr:"",sub_attr:""}
  constitution:{attr:string,sub_attr:string}={attr:"",sub_attr:""}
  intelligence:{attr:string,sub_attr:string}={attr:"",sub_attr:""}
  wisdom:{attr:string,sub_attr:string}={attr:"",sub_attr:""}
  charisma:{attr:string,sub_attr:string}={attr:"",sub_attr:""}

  passiv_wisdom:string=""
  inspiration:string=""
  proficiency_bonus:string=""

  hit_die:string="d6"

  death_saves_success:boolean[]=[false,false,false]
  death_saves_failure:boolean[]=[false,false,false]

  saving_throws:string[]=["0","0","0","0","0","0"]
  saving_throws_checked:boolean[]=[false,false,false,false,false,false]

  xp:number=0;

  inventory: InventoryItem[] = []
}

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  character_list:DnDCharacter[]=[];

  selected_character?:DnDCharacter = this.character_list[0];

  deleteCharacter(character:DnDCharacter){
    this.character_list.splice(this.character_list.lastIndexOf(character),1);

    this.save_to_localstorage();
  }

  addCharacter(character:DnDCharacter){
    this.character_list.push(character);
    this.save_to_localstorage();
  }

  select_character(character:DnDCharacter){
    this.selected_character=character;
  }

  save_to_localstorage(){
    console.log("saving...");
    localStorage.setItem('dnd_characters', JSON.stringify(this.character_list));
    //console.log(this.character_list);
    //localStorage.setItem('selected_dnd_character', JSON.stringify(this.select_character));
  }

  load_from_localstorage(){
    console.log("loading...");
    var retrievedObject = localStorage.getItem('dnd_characters');

    //var retrievedObject = localStorage.getItem('selected_dnd_character');
    if(retrievedObject){
      this.character_list = JSON.parse(retrievedObject);
    }
  }

  constructor() { }
}
