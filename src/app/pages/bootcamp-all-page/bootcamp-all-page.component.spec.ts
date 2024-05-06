import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampAllPageComponent } from './bootcamp-all-page.component';

describe('BootcampAllPageComponent', () => {
  let component: BootcampAllPageComponent;
  let fixture: ComponentFixture<BootcampAllPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BootcampAllPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BootcampAllPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
