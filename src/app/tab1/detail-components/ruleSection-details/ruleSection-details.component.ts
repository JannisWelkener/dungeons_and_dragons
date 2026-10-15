import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApolloGraphqlService } from '../../../api/apollo-graphql.service';
import { RuleSection_Detailed } from '../../../api/queries/ruleSection';
import { CommonDetailsComponent } from '../common-details/common-details.component';

@Component({
  selector: 'app-rule-section-details',
  templateUrl: '../common-details/common-details.component.html',
  styleUrls: ['../common-details/common-details.component.scss'],
})
export class RuleSectionDetailsComponent extends CommonDetailsComponent implements OnInit {
  @Output()
  confirm = new EventEmitter<{resource: string, index: string}>();
  @Input()
  index: string | undefined
  @Input()
  fnCanConfirm: ((resource: string, index: string) => boolean) | undefined;
  title: string = "RuleSection";

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
      this.apollo_system.ruleSection_detail(this.index, result => {
        this.loading = result.loading;
        this.error = result.loading == undefined;
        this.details = undefined;
        if(result.data.ruleSection != undefined)
          this.details = this.convert(result.data.ruleSection);
      });
    }
  }

  convert(data: RuleSection_Detailed){
    let details: typeof this.details = []

    details.push({label: "Name", value: data.name})
    details.push({label: "Description", value: data.desc})
    return details;
  }

}
