import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EquipmentCategorySearchComponent } from './equipmentCategory-search.component';

describe('EquipmentCategorySearchComponent', () => {
  let component: EquipmentCategorySearchComponent;
  let fixture: ComponentFixture<EquipmentCategorySearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentCategorySearchComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EquipmentCategorySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }))

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});