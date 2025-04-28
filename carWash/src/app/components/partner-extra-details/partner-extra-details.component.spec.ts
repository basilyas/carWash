import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerExtraDetailsComponent } from './partner-extra-details.component';

describe('PartnerExtraDetailsComponent', () => {
  let component: PartnerExtraDetailsComponent;
  let fixture: ComponentFixture<PartnerExtraDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerExtraDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerExtraDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
