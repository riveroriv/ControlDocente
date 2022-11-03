import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMatetriaDialogComponent } from './new-matetria-dialog.component';

describe('NewMatetriaDialogComponent', () => {
  let component: NewMatetriaDialogComponent;
  let fixture: ComponentFixture<NewMatetriaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMatetriaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMatetriaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
