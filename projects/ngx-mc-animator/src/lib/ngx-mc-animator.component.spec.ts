import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMcAnimatorComponent } from './ngx-mc-animator.component';

describe('NgxMcAnimatorComponent', () => {
  let component: NgxMcAnimatorComponent;
  let fixture: ComponentFixture<NgxMcAnimatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxMcAnimatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMcAnimatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
