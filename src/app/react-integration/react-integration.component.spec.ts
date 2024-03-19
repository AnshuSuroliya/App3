import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactIntegrationComponent } from './react-integration.component';

describe('ReactIntegrationComponent', () => {
  let component: ReactIntegrationComponent;
  let fixture: ComponentFixture<ReactIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReactIntegrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReactIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
