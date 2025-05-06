import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurgerDisplayComponent } from './burger-display.component';

describe('BurgerDisplayComponent', () => {
  let component: BurgerDisplayComponent;
  let fixture: ComponentFixture<BurgerDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BurgerDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BurgerDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
