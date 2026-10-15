import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApolloGraphqlService } from '../../../api/apollo-graphql.service';
import { SearchResultListComponent } from '../search-result-list/search-result-list.component';
import { CommonSearchComponent } from '../common-search/common-search.component';


type ListEntry = typeof SearchResultListComponent.entry;

@Component({
  selector: 'app-monster-search',
  templateUrl: '../common-search/common-search.component.html',
  styleUrls: ['../common-search/common-search.component.scss'],
})
export class MonsterSearchComponent extends CommonSearchComponent implements OnInit {

  constructor(private dndService: ApolloGraphqlService, modalCtrl: ModalController) {
    super(modalCtrl);
  }

  ngOnInit(): void {
    this.search("")
  }

  @Output() confirm = new EventEmitter<{resource: string, index: string}>
  @Input() fnCanConfirm: ((resource: string, index: string) => boolean) | undefined;
  loading: boolean = false;
  error: boolean = false;
  list: ListEntry[] = [];
  resource: string = "monsters"

  search(term: string): void {
    this.list = [];
    this.error = false;
    this.loading = true;
    this.dndService.monster_search(term, (result) => {
      this.loading = result.loading;
      this.error = result.error != undefined;

      let data = result.data || {monsters: []};
      this.list = data.monsters.map((monster) => {
        return {
          identifier: monster.index,

          title: monster.name,
          details: monster.type + " (" + monster.challenge_rating + ")",
          description: monster.desc,
        }
      })
    });
  }

}
