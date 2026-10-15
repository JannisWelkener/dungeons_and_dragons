import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { SearchResultListComponent } from "./search-components/search-result-list/search-result-list.component";
import { MonsterDetailsComponent } from "./detail-components/monster-details/monster-details.component";
import { MonsterSearchComponent } from "./search-components/monster-search/monster-search.component";
import { SpellSearchComponent } from "./search-components/spell-search/spell-search.component";
import { SpellDetailsComponent } from './detail-components/spell-details/spell-details.component';
import { AbilityScoreSearchComponent } from "./search-components/abilityScore-search/abilityScore-search.component";
import { AlignmentSearchComponent } from './search-components/alignment-search/alignment-search.component';
import { BackgroundSearchComponent } from './search-components/background-search/background-search.component';
import { ClassSearchComponent } from './search-components/class-search/class-search.component';
import { ConditionSearchComponent } from './search-components/condition-search/condition-search.component';
import { DamageTypeSearchComponent } from './search-components/damageType-search/damageType-search.component';
import { EquipmentSearchComponent } from './search-components/equipment-search/equipment-search.component';
import { EquipmentCategorySearchComponent } from './search-components/equipmentCategory-search/equipmentCategory-search.component';
import { FeatSearchComponent } from './search-components/feat-search/feat-search.component';
import { FeatureSearchComponent } from './search-components/feature-search/feature-search.component';
import { LanguageSearchComponent } from './search-components/language-search/language-search.component';
import { LevelSearchComponent } from './search-components/level-search/level-search.component';
import { MagicItemSearchComponent } from './search-components/magicItem-search/magicItem-search.component';
import { MagicSchoolSearchComponent } from './search-components/magicSchool-search/magicSchool-search.component';
import { ProficiencySearchComponent } from './search-components/proficiency-search/proficiency-search.component';
import { RaceSearchComponent } from './search-components/race-search/race-search.component';
import { RuleSearchComponent } from './search-components/rule-search/rule-search.component';
import { RuleSectionSearchComponent } from './search-components/ruleSection-search/ruleSection-search.component';
import { SkillSearchComponent } from './search-components/skill-search/skill-search.component';
import { SubclassSearchComponent } from './search-components/subclass-search/subclass-search.component';
import { SubraceSearchComponent } from './search-components/subrace-search/subrace-search.component';
import { TraitSearchComponent } from './search-components/trait-search/trait-search.component';
import { WeaponPropertySearchComponent } from './search-components/weaponProperty-search/weaponProperty-search.component';
import { AbilityScoreDetailsComponent } from './detail-components/abilityScore-details/abilityScore-details.component';
import { AlignmentDetailsComponent } from './detail-components/alignment-details/alignment-details.component';
import { BackgroundDetailsComponent } from './detail-components/background-details/background-details.component';
import { ClassDetailsComponent } from './detail-components/class-details/class-details.component';
import { ConditionDetailsComponent } from './detail-components/condition-details/condition-details.component';
import { DamageTypeDetailsComponent } from './detail-components/damageType-details/damageType-details.component';
import { EquipmentDetailsComponent } from './detail-components/equipment-details/equipment-details.component';
import { EquipmentCategoryDetailsComponent } from './detail-components/equipmentCategory-details/equipmentCategory-details.component';
import { FeatDetailsComponent } from './detail-components/feat-details/feat-details.component';
import { FeatureDetailsComponent } from './detail-components/feature-details/feature-details.component';
import { LanguageDetailsComponent } from './detail-components/language-details/language-details.component';
import { LevelDetailsComponent } from './detail-components/level-details/level-details.component';
import { MagicItemDetailsComponent } from './detail-components/magicItem-details/magicItem-details.component';
import { MagicSchoolDetailsComponent } from './detail-components/magicSchool-details/magicSchool-details.component';
import { ProficiencyDetailsComponent } from './detail-components/proficiency-details/proficiency-details.component';
import { RaceDetailsComponent } from './detail-components/race-details/race-details.component';
import { RuleDetailsComponent } from './detail-components/rule-details/rule-details.component';
import { RuleSectionDetailsComponent } from './detail-components/ruleSection-details/ruleSection-details.component';
import { SkillDetailsComponent } from './detail-components/skill-details/skill-details.component';
import { SubclassDetailsComponent } from './detail-components/subclass-details/subclass-details.component';
import { SubraceDetailsComponent } from './detail-components/subrace-details/subrace-details.component';
import { TraitDetailsComponent } from './detail-components/trait-details/trait-details.component';
import { WeaponPropertyDetailsComponent } from './detail-components/weaponProperty-details/weaponProperty-details.component';
import { DetailsModalComponent } from './detail-components/details-modal/details-modal.component';
import { SearchModalComponent } from './search-components/search-modal/search-modal.component';

@NgModule({
    declarations: [Tab1Page, SearchResultListComponent,
        SearchModalComponent, DetailsModalComponent,
        AbilityScoreSearchComponent, AbilityScoreDetailsComponent,
        AlignmentSearchComponent, AlignmentDetailsComponent,
        BackgroundSearchComponent, BackgroundDetailsComponent,
        ClassSearchComponent, ClassDetailsComponent,
        ConditionSearchComponent, ConditionDetailsComponent,
        DamageTypeSearchComponent, DamageTypeDetailsComponent,
        EquipmentSearchComponent, EquipmentDetailsComponent,
        EquipmentCategorySearchComponent, EquipmentCategoryDetailsComponent,
        FeatSearchComponent, FeatDetailsComponent,
        FeatureSearchComponent, FeatureDetailsComponent,
        LanguageSearchComponent, LanguageDetailsComponent,
        LevelSearchComponent, LevelDetailsComponent,
        MagicItemSearchComponent, MagicItemDetailsComponent,
        MagicSchoolSearchComponent, MagicSchoolDetailsComponent,
        MonsterSearchComponent, MonsterDetailsComponent,
        ProficiencySearchComponent, ProficiencyDetailsComponent,
        RaceSearchComponent, RaceDetailsComponent,
        RuleSearchComponent, RuleDetailsComponent,
        RuleSectionSearchComponent, RuleSectionDetailsComponent,
        SkillSearchComponent, SkillDetailsComponent,
        SpellSearchComponent, SpellDetailsComponent,
        SubclassSearchComponent, SubclassDetailsComponent,
        SubraceSearchComponent, SubraceDetailsComponent,
        TraitSearchComponent, TraitDetailsComponent,
        WeaponPropertySearchComponent, WeaponPropertyDetailsComponent,
    ],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        Tab1PageRoutingModule,

    ]
})
export class Tab1PageModule {}
