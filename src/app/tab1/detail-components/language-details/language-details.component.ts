import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApolloGraphqlService } from '../../../api/apollo-graphql.service';
import { Language_Detailed } from '../../../api/queries/language';
import { CommonDetailsComponent } from '../common-details/common-details.component';

@Component({
  selector: 'app-language-details',
  templateUrl: '../common-details/common-details.component.html',
  styleUrls: ['../common-details/common-details.component.scss'],
})
export class LanguageDetailsComponent extends CommonDetailsComponent implements OnInit {
  @Output()
  confirm = new EventEmitter<{resource: string, index: string}>();
  @Input()
  index: string | undefined
  @Input()
  fnCanConfirm: ((resource: string, index: string) => boolean) | undefined;
  title: string = "Language";

  constructor(private apollo_system: ApolloGraphqlService, modalCtrl: ModalController) {
    super(modalCtrl);
  }

  ngOnInit() {
    this.loading = false;
    this.error = true;
    this.details = undefined;

    if( this.index ){
      this.loading = true;
      this.error = false;
      this.apollo_system.language_detail(this.index, result => {
        this.loading = result.loading;
        this.error = result.loading == undefined;
        this.details = undefined;
        if(result.data.language != undefined)
          this.details = this.convert(result.data.language);
      });
    }
  }

  convert(data: Language_Detailed){
    let details: typeof this.details = []

    details.push({label: "Name", value: data.name})
    if(data.desc)
      details.push({label: "Description", value: data.desc})
    details.push({label: "Script", value: data.script})
    details.push({label: "Type", value: data.type})
    details.push({label: "Typical Speakers", values: data.typical_speakers.map(s=>(
      {value:s}
    ))})

    return details;
  }

}