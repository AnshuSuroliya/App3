import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoManageComponent } from './repo-manage.component';

describe('RepoManageComponent', () => {
  let component: RepoManageComponent;
  let fixture: ComponentFixture<RepoManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepoManageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepoManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
