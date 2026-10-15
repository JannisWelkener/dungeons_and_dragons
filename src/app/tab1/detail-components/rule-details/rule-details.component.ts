import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApolloGraphqlService } from '../../../api/apollo-graphql.service';
import { Rule_Detailed } from '../../../api/queries/rule';
import { CommonDetailsComponent } from '../common-details/common-details.component';

@Component({
  selector: 'app-rule-details',
  templateUrl: '../common-details/common-details.component.html',
  styleUrls: ['../common-details/common-details.component.scss'],
})
export class RuleDetailsComponent extends CommonDetailsComponent implements OnInit {
  @Output()
  confirm = new EventEmitter<{resource: string, index: string}>();
  @Input()
  index: string | undefined
  @Input()
  fnCanConfirm: ((resource: string, index: string) => boolean) | undefined;
  title: string = "Rule";

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
      this.apollo_system.rule_detail(this.index, result => {
        this.loading = result.loading;
        this.error = result.loading == undefined;
        this.details = undefined;
        if(result.data.rule != undefined)
          this.details = this.convert(result.data.rule);
      });
    }
  }

  convert(data: Rule_Detailed){
    let details: typeof this.details = []

    details.push({label: "Name", value: data.name})
    details.push({label: "Description", value: data.desc})
    details.push({label: "Subsections", values: data.subsections.map(s=>(
      {value:s.name, ref:{resource:"ruleSections", index:s.index}}
    ))})
    return details;
  }

}