import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampsPageComponent } from './bootcamps-page.component';

describe('BootcampsPageComponent', () => {
  let component: BootcampsPageComponent;
  let fixture: ComponentFixture<BootcampsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BootcampsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BootcampsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
