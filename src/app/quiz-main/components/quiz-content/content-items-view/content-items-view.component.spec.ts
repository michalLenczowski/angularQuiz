import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentItemsViewComponent } from './content-items-view.component';

describe('ContentItemsViewComponent', () => {
  let component: ContentItemsViewComponent;
  let fixture: ComponentFixture<ContentItemsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentItemsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentItemsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
