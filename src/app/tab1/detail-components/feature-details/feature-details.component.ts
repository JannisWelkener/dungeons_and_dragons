import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApolloGraphqlService } from '../../../api/apollo-graphql.service';
import { Feature_Detailed } from '../../../api/queries/feature';
import { CommonDetailsComponent } from '../common-details/common-details.component';

@Component({
  selector: 'app-feature-details',
  templateUrl: '../common-details/common-details.component.html',
  styleUrls: ['../common-details/common-details.component.scss'],
})
export class FeatureDetailsComponent extends CommonDetailsComponent implements OnInit {
  @Output()
  confirm = new EventEmitter<{resource: string, index: string}>();
  @Input()
  index: string | undefined
  @Input()
  fnCanConfirm: ((resource: string, index: string) => boolean) | undefined;
  title: string = "Feature";

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
      this.apollo_system.feature_detail(this.index, result => {
        this.loading = result.loading;
        this.error = result.loading == undefined;
        this.details = undefined;
        if(result.data.feature != undefined)
          this.details = this.convert(result.data.feature);
      });
    }
  }

  private prerequisite(prereq: {
    type: "level" | "feature" | "spell"
    level: undefined | number
    feature: undefined | {
      index: string
      name: string
    }
    spell: undefined | {
      index: string
      name: string
    }
  }){
    switch(prereq.type){
      case "level":
        return {value: "Level: "+prereq.level}
      case "feature":
        return {value: "Feature: "+prereq.feature?.name, ref:{resource:"features", index:prereq.feature?.index || ""}}
      case "spell":
        return {value: "Spell: "+prereq.spell?.name, ref:{resource:"spells", index:prereq.spell?.index || ""}}
    }
  }

  convert(data: Feature_Detailed){
    let details: typeof this.details = []

    details.push({label: "Name", value: data.name})
    details.push({label: "Level", value: data.level})
    details.push({label: "Desciption", values:data.desc.map(d=>({value:d}))})
    if(data.parent)
      details.push({label: "Parent", value:data.parent.name, ref:{resource:"features", index:data.parent.index}})
    details.push({label: "Class", value:data.class.name, ref:{resource:"classes", index:data.class.index}})
    if(data.subclass)
      details.push({label: "Subclass", value:data.subclass.name, ref:{resource:"subclasses", index:data.subclass.index}})
    details.push({label:"Prerequisites", values:data.prerequisites.map(this.prerequisite)})
    if(data.feature_specific && data.feature_specific.invocations)
      details.push({label: "Invocations", values:data.feature_specific.invocations.map(i=>(
        {value:i.name, ref:{resource:"features", index:i.index}}
      ))})
    if(data.feature_specific && data.feature_specific.subfeature_options)
      details.push({
        label: "Subfeature Options (Choose "+data.feature_specific.subfeature_options.choose+")",
        values: data.feature_specific.subfeature_options.from.options.map(f=>(
          {value: f.item.name, ref:{resource:"features", index:f.item.index}}
        ))
      })

      //TODO: expertise options!

    return details;
  }

  //   feature_specific: undefined | {
  //     expertise_options: undefined | {
  //       choose: number
  //       from: {
  //         options: {
  //           item: undefined | {
  //             index: string
  //             name: string
  //           }
  //           items: undefined | {
  //             item: undefined | {
  //               index: string
  //               name: string
  //             }
  //             choice: undefined | {
  //               choose: number
  //               from: {
  //                 options: {
  //                   item: undefined | {
  //                     index: string
  //                     name: string
  //                   }
  //                 }[]
  //               }
  //             }
  //           }[]
  //           choice: undefined | {
  //             choose: number
  //             from: {
  //               options: {
  //                 item: undefined | {
  //                   index: string
  //                   name: string
  //                 }
  //               }[]
  //             }
  //           }
  //         }[]
  //       }
  //     }
  //   }
  // }

}
