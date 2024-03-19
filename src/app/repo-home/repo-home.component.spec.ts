import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoHomeComponent } from './repo-home.component';

describe('RepoHomeComponent', () => {
  let component: RepoHomeComponent;
  let fixture: ComponentFixture<RepoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepoHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
