import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonInput, ModalController } from '@ionic/angular';
import { ApolloGraphqlService } from '../../../api/apollo-graphql.service';
import { SkillDetailsComponent } from '../../detail-components/skill-details/skill-details.component';
import { CommonSearchComponent } from '../common-search/common-search.component';
import { SearchResultListComponent } from '../search-result-list/search-result-list.component';

type ListEntry = typeof SearchResultListComponent.entry;

@Component({
  selector: 'app-skill-search',
  templateUrl: '../common-search/common-search.component.html',
  styleUrls: ['../common-search/common-search.component.scss'],
})
export class SkillSearchComponent extends CommonSearchComponent implements OnInit{

  @ViewChild("searchInput") searchInput: IonInput | undefined;
  @Output() confirm = new EventEmitter<{resource: string, index: string}>
  @Input() fnCanConfirm: ((resource: string, index: string) => boolean) | undefined;
  loading: boolean = false;
  error: boolean = false;
  list: ListEntry[] = [];
  resource: string = "skills"

  constructor(private graphService: ApolloGraphqlService, modalCtrl: ModalController){
    super(modalCtrl);
  }
  ngOnInit(): void {
    this.search("")
  }

  search(term: string): void {
    this.list = [];
    this.error = false;
    this.loading = true;

    this.graphService.skill_search(term, (result) => {
      this.loading = result.loading;
      this.error = result.error != undefined;

      this.list = result.data.skills.map((skill) => {
        return {
          identifier: skill.index,

          title: skill.name,
          details: skill.ability_score.full_name,
          description: skill.desc[0]
        }
      })
    });
  }
}