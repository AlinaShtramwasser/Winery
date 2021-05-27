/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WineryGridComponent } from './winery-grid.component';

describe('WineryGridComponent', () => {
  let component: WineryGridComponent;
  let fixture: ComponentFixture<WineryGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WineryGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineryGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
