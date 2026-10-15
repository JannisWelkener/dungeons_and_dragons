import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

type Entry = {
  identifier: string,

  title: string,
  details: string,
  description: string,
}

@Component({
  selector: 'app-search-result-list',
  templateUrl: './search-result-list.component.html',
  styleUrls: ['./search-result-list.component.scss'],
})
export class SearchResultListComponent implements OnInit {
  static entry: Entry = undefined as any;

  @Input()
  loading: boolean = true;
  @Input()
  error: boolean = false;
  @Input()
  resource: string | undefined;
  @Input()
  list: Entry[] = [];

  @Output()
  entryClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  onEntryClicked(entry: Entry){
    this.entryClicked.emit(entry.identifier);
  }

}
