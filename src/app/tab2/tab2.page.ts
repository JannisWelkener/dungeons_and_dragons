import { Component, OnInit, QueryList, ViewChildren } from '@angular/core'
import { DiceRenderComponent } from '../dice-render/dice-render.component';
import { Motion } from '@capacitor/motion';
import { Vector3 } from 'three';

interface Dice{
  name:string
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit{
  ngOnInit(): void {
    this.motion();
  }

  async motion(){
    //TODO: No Permission needed yet - possibly need to request in future!
    await Motion.addListener('accel', event => {
      if(event && event.acceleration){
        let length = new Vector3(event.acceleration.x, event.acceleration.y, event.acceleration.z).length()
        if(length > 50){

          console.log('Device motion event:', length);
          this.reroll();
        }
      }
    });
  }

  @ViewChildren(DiceRenderComponent) private _childrenFoo?: QueryList<DiceRenderComponent>;

  selected_dice: Dice[]=[];

  addDiceToBox(name: string){
    if(this.canAddDice())
      this.selected_dice.push({name: name})
  }

  canAddDice(): boolean{
    return this.selected_dice.length < 8
  }

  addW4(){ this.addDiceToBox("d4")}
  addW6(){ this.addDiceToBox("w6")}
  addW8(){ this.addDiceToBox("w8")}
  addW10(){this.addDiceToBox("w10")}
  addW12(){this.addDiceToBox("w12")}
  addW20(){this.addDiceToBox("w20")}

  removeDice(dice:Dice){
    this.selected_dice.splice(this.selected_dice.indexOf(dice),1);
  }

  reroll(){
    if(this._childrenFoo){
      this._childrenFoo.forEach((it)=>{
        it.reroll();
      });
    }
  }

}
