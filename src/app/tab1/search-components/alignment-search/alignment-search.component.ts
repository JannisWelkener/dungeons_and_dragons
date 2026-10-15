import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonInput, ModalController } from '@ionic/angular';
import { ApolloGraphqlService } from '../../../api/apollo-graphql.service';
import { AlignmentDetailsComponent } from '../../detail-components/alignment-details/alignment-details.component';
import { DetailsModalComponent } from '../../detail-components/details-modal/details-modal.component';
import { CommonSearchComponent } from '../common-search/common-search.component';
import { SearchResultListComponent } from '../search-result-list/search-result-list.component';

type ListEntry = typeof SearchResultListComponent.entry;

@Component({
  selector: 'app-alignment-search',
  templateUrl: '../common-search/common-search.component.html',
  styleUrls: ['../common-search/common-search.component.scss'],
})
export class AlignmentSearchComponent extends CommonSearchComponent implements OnInit{

  @ViewChild("searchInput") searchInput: IonInput | undefined;
  @Output() confirm = new EventEmitter<{resource: string, index: string}>
  @Input() fnCanConfirm: ((resource: string, index: string) => boolean) | undefined;
  loading: boolean = false;
  error: boolean = false;
  list: ListEntry[] = [];
  resource: string = "alignments"

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

    this.graphService.alignment_search(term, (result) => {
      this.loading = result.loading;
      this.error = result.error != undefined;

      this.list = result.data.alignments.map((alignment) => {
        return {
          identifier: alignment.index,

          title: alignment.name,
          details: alignment.abbreviation,
          description: alignment.desc
        }
      })
    });
  }
}