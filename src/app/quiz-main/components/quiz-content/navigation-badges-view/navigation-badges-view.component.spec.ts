import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBadgesViewComponent } from './navigation-badges-view.component';

describe('NavigationBadgesViewComponent', () => {
  let component: NavigationBadgesViewComponent;
  let fixture: ComponentFixture<NavigationBadgesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationBadgesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBadgesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
