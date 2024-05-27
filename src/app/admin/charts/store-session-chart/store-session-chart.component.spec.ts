import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreSessionChartComponent } from './store-session-chart.component';

describe('StoreSessionChartComponent', () => {
  let component: StoreSessionChartComponent;
  let fixture: ComponentFixture<StoreSessionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoreSessionChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoreSessionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
