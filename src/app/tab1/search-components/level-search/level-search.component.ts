import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IonInput, ModalController, SelectCustomEvent } from '@ionic/angular';
import { ApolloGraphqlService } from '../../../api/apollo-graphql.service';
import { CommonSearchComponent } from '../common-search/common-search.component';
import { SearchResultListComponent } from '../search-result-list/search-result-list.component';

type ListEntry = typeof SearchResultListComponent.entry;
type Class = "fighter" | "barbarian" | "paladin" | "monk" | "ranger" | "druid" | "sorcerer" | "rogue" | "warlock" | "bard" | "cleric" | "wizard"
function isClass(check: string): check is Class{
  return ["fighter", "barbarian", "paladin", "monk", "ranger", "druid", "sorcerer", "rogue", "warlock", "bard", "cleric", "wizard"].includes(check)
}

@Component({
  selector: 'app-level-search',
  templateUrl: './level-search.component.html', //SPECIAL!!!
  styleUrls: ['../common-search/common-search.component.scss'],
})
export class LevelSearchComponent extends CommonSearchComponent{

  @ViewChild("searchInput") searchInput: IonInput | undefined;
  @Output() confirm = new EventEmitter<{resource: string, index: string}>
  @Input() fnCanConfirm: ((resource: string, index: string) => boolean) | undefined;
  loading: boolean = false;
  error: boolean = false;
  list: ListEntry[] = [];
  resource: string = "levels"

  constructor(private graphService: ApolloGraphqlService, modalCtrl: ModalController){
    super(modalCtrl);
  }

  search(term: Class): void {
    this.list = [];
    this.error = false;
    this.loading = true;

    this.graphService.level_search(term as any, (result) => {
      this.loading = result.loading;
      this.error = result.error != undefined;

      this.list = result.data.levels.map((level) => {
        let [title, details] = [level.class.name, ""]
        if(level.subclass){
          title = level.subclass.name
          details = level.class.name
        }

        return {
          identifier: level.index,

          title: title+": Level "+level.level,
          details: details,
          description: level.features.map(f=>f.name).join(", ")
        }
      })
    });
  }

  classes(): {index: string, title: string}[]{
    return [
      {
        "index": "fighter",
        "title": "Fighter"
      },
      {
        "index": "barbarian",
        "title": "Barbarian"
      },
      {
        "index": "paladin",
        "title": "Paladin"
      },
      {
        "index": "monk",
        "title": "Monk"
      },
      {
        "index": "ranger",
        "title": "Ranger"
      },
      {
        "index": "druid",
        "title": "Druid"
      },
      {
        "index": "sorcerer",
        "title": "Sorcerer"
      },
      {
        "index": "rogue",
        "title": "Rogue"
      },
      {
        "index": "warlock",
        "title": "Warlock"
      },
      {
        "index": "bard",
        "title": "Bard"
      },
      {
        "index": "cleric",
        "title": "Cleric"
      },
      {
        "index": "wizard",
        "title": "Wizard"
      }
    ]
  }

  onSelectChanged(event: any){
    let index = (event as SelectCustomEvent<string>).detail.value
    if(isClass(index))
      this.search(index);
  }

}