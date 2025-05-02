import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RssIconsComponent } from './rss-icons.component';

describe('RssIconsComponent', () => {
  let component: RssIconsComponent;
  let fixture: ComponentFixture<RssIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RssIconsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RssIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
