import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageProductsComponent } from './home-page-products.component';

describe('HomePageProductsComponent', () => {
  let component: HomePageProductsComponent;
  let fixture: ComponentFixture<HomePageProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
