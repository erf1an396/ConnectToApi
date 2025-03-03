import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideDashboardComponent } from './side-dashboard.component';

describe('SideDashboardComponent', () => {
  let component: SideDashboardComponent;
  let fixture: ComponentFixture<SideDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
