import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput, IonModal, ModalController, SelectCustomEvent } from '@ionic/angular';
import { ApolloGraphqlService } from '../api/apollo-graphql.service';
import { MonsterSearchComponent } from '../tab1/search-components/monster-search/monster-search.component';
import { CharactersService, DnDCharacter } from '../service/characters.service';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  @ViewChild("searchInput") searchInput: IonInput | undefined;

  constructor(private modalCtrl: ModalController,private dndService: ApolloGraphqlService,public characters:CharactersService,private router: Router) {
    this.loadAllClasses();
    this.loadAllRaces();
  }
  ngOnInit(): void {
    //console.log("nginit");
    this.characters.load_from_localstorage();
  }

  public allClasses:any
  public allRaces:any

  public selectedRace:string=""
  public selectedClass!:{
    index: string;
    title: string;
  };

  isModalOpen = false;

  openModal() {
    this.modalCtrl.create({
      component: MonsterSearchComponent,
    })
    .then(modal => modal.present())
  }


  loadAllClasses(){
    var query = this.dndService.getAllClasses();
    query.valueChanges.subscribe((result) => {
      let data = result.data || {classes: []};;
      this.allClasses = result.data?.classes;
    });
  }

  loadAllRaces(){
    var query = this.dndService.getAllRaces();
    query.valueChanges.subscribe((result) => {
      let data = result.data || {races: []};
      this.allRaces = result.data?.races;
    });
  }

  getClassInfo(){
    var query = this.dndService.getClassInfo("barbarian");
    query.valueChanges.subscribe((result) => {

      let data = result.data || {class: []};

      var equipLen = 0;
      equipLen = result.data?.class.starting_equipment.length!;

      for(let i=0;i<equipLen;i++){
        console.log(result.data?.class.starting_equipment[i].equipment.index);
      }

      var equipOptLen = 0;
      equipOptLen = result.data?.class.starting_equipment_options.length!;

      for(let i=0;i<equipOptLen;i++){
        console.log(result.data?.class.starting_equipment_options[i].desc);
      }
    });
  }


  addNewCharacter(){
    console.log("Name: "+this.searchInput?.value+" Class: "+this.selectedClass+" Race: "+this.selectedRace)
    if(this.selectedClass!=null && this.selectedRace!="" && this.searchInput?.value){
      var newCharacter:DnDCharacter=new DnDCharacter();

      newCharacter.race=this.selectedRace;
      newCharacter.class_type=this.selectedClass;
      newCharacter.name=this.searchInput.value as string;

      this.characters.addCharacter(newCharacter);
    }
  }

  onSelectChangedRace(event: any){
    this.selectedRace = (event as SelectCustomEvent<string>).detail.value;
  }
  onSelectChangedClass(event: any){
    this.selectedClass = (event as SelectCustomEvent<{index: string;title: string;}>).detail.value;
  }

  onCharacterClicked(character:DnDCharacter){
    this.characters.selected_character = character;
    //Open character-sheet...
  }




  isOpenModal=false;

  openDeleteDialog(character:DnDCharacter){
    this.characters.select_character(character);
    this.isOpenModal=true;
  }

  cancel() {
    this.isOpenModal=false;
  }

  confirm() {
    this.isOpenModal=false;
    this.characters.deleteCharacter(this.characters.selected_character!);
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    this.isOpenModal=false;
  }

}
